const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const typeDefs = gql`
    type Note {
    id: ID
    content: String!
    author: String!    
    }
    type Query{
    hello: String!
    notes: [Note!]
    note(id: ID!): Note!    
    }
    type Mutation{
    newNote(content: String!): Note!
    }
    `;

const resolvers = {
    Query: {
        hello: () => 'hello world!',
        notes: async () => {
            return await models.Note.find(args.id);
        },
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    },
    Mutation:{
      newNote: async (parent, args) => {
          return await models.Note.create({
              content: args.content,
              author: 'Adam Scott'
          });
          notes.push(noteValue);
          return noteValue;
      }
    }
}

// let notes = [
//     {id: '1', content: 'aaa', author: 'aaa'},
//     {id: '2', content: 'bbb', author: 'bbb'},
//     {id: '3', content: 'ccc', author: 'ccc'},
// ]

//app.get('/', (req, res) => res.send('hello world'));
//app.listen({port}, () => console.log(`${port}번 포트로 진입`));

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();

    const app = express();
    db.connect(DB_HOST);

    server.applyMiddleware({
        app, path: '/api'
    });

    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers)