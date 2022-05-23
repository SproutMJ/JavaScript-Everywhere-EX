const models = require("../models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express')
require('dotenv').config()
const gravatar = require('gravatar')
const e = require("express");

module.exports = {
    newNote: async (parent, args, {models}) => {
        return await models.Note.create({
            content: args.content,
            author: 'Adam Scott'
        });
    },
    deleteNote: async (parent, {id}, {models}) => {
        try {
            await models.Note.findOneAndRemove({_id: id});
            return true;
        } catch (e) {
            return false;
        }
    },
    updateNote: async  (parent, {content, id}, {models}) => {
        return await models.Note.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    content
                },
            },
            {
                new: true
            });
    },
    signUp: async (parent, {username, email, password}, {models})=>{
        email = email.trim().toLowerCase()
        const hashed = await bcrypt.hash(password, 10)
        const avatar = gravatar.url(email)
        try{
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            })
            return jwt.sign({id: user.id}, process.env.JWT_SECRET)
        }catch (e) {
            console.log(e)
            throw new Error('not created account')
        }
    },
    signIn: async (parent, {username, email, password}, {models})=>{
        if(email) email = email.trim().toLowerCase()
        const user = await models.User.findOne({
            $or: [{email}, {username}]
        })

        if(!user) throw new AuthenticationError('sign in error')

        const valid = await bcrypt.compare(password, user.password)
        if(!valid) throw new AuthenticationError('sign in error')

        return jwt.sign({id: user._id}, process.env.JWT_SECRET)
    }
}