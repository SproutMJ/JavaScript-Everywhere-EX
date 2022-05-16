const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;
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
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    },
    Mutation:{
      newNote: (parent, args) =>{
          let noteValue = {
              id: String(notes.length + 1),
              content: args.content,
              author: 'Adam Scott'
          };
          notes.push(noteValue);
          return noteValue;
      }
    }
}

let notes = [
    {id: '1', content: 'aaa', author: 'aaa'},
    {id: '2', content: 'bbb', author: 'bbb'},
    {id: '3', content: 'ccc', author: 'ccc'},
]




//app.get('/', (req, res) => res.send('hello world'));
//app.listen({port}, () => console.log(`${port}번 포트로 진입`));

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();

    const app = express();

    server.applyMiddleware({
        app, path: '/api'
    });

    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers)