// controllers/postController.js
const Post = require("../model/Post");

const postController = {
  Query: {
    getPosts: async () => await Post.find(),
  },
  Mutation: {
    createPost: async (_, { title, content }) => {
      const newPost = new Post({ title, content });
      return await newPost.save();
    },
    deletePost: async (_, { id }) => {
      await Post.findByIdAndDelete(id);
      return "Post deleted";
    },
  },
};

module.exports = postController;
