const models = require("../models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express')
require('dotenv').config()
const gravatar = require('gravatar')
const e = require("express");

module.exports = {
    newNote: async (parent, args, {models, user}) => {
        if(!user) throw new AuthenticationError('로그인하고 추가하세요')

        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        });
    },
    deleteNote: async (parent, {id}, {models, user}) => {
        if(!user) throw new AuthenticationError('삭제할 수 없는 유저입니다.')

        const nwte = await models.Note.findById(id)
        if(note&&String(note.author) !== user.id) throw new ForbiddenError('삭제 권한이 없습니다.')
        try {
            await note.remove()
            return true;
        } catch (e) {
            return false;
        }
    },
    updateNote: async  (parent, {content, id}, {models, user}) => {
        if(!user) throw new AuthenticationError('갱신할 수 없는 유저입니다.')

        const note = await models.Note.findById(id)
        if(node&&String(note.author) !== user.id) throw new ForbiddenError('갱신 권한이 없습니다.')
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
    },
    toggleFavorite: async (parent, {id}, {models, user})=>{
        if(!user) throw new AuthenticationError()

        let noteCheck = await models.Note.findById(id)
        const hasUser = noteCheck.favoritedBy.indexOf((user.id))

        if(hasUser >= 0) return await  models.Note.findByIdAndUpdate(
            id,
            {
                $pull:{
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc:{
                    favoriteCount: -1
                }
            },
            {
                new: true
            }
        )
        else return await  models.Note.findByIdAndUpdate(
            id,
            {
                $push:{
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc:{
                    favoriteCount: 1
                }
            },
            {
                new: true
            }
        )
    }
}