const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;
const typeDefs = gql`
    type Query{
    hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'hello world!'
    }
}


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