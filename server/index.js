const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const postController = require("./src/controller/postController");
require("dotenv").config();

// GraphQL Schema
const typeDefs = gql`
  type Post {
    id: ID
    title: String
    content: String
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    deletePost(id: ID!): String
  }
`;

// Initialize Express
const app = express();

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers: postController, // Use the imported controller here
});

server.start().then(() => {
  server.applyMiddleware({ app });

  // Connect to MongoDB
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

  // Start the server
  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
});
