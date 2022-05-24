const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const jwt = require('jsonwebtoken')
const getUser = token=>{
    if(token){
        try{
            return jwt.verify(token, process.env.JWT_SECRET)
        }catch (e){
            throw new Error('session invalid')
        }
    }
}
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
db.connect(DB_HOST);

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req})=>{
            const token = req.headers.authorization
            const user = getUser(token)

            return {models, user};
        }
    });

    await server.start();

    server.applyMiddleware({
        app, path: '/api'
    });

    await new Promise(resolvers => app.listen({ port }, resolvers));
    console.log(`http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers)