import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST, GET_POSTS } from "../graphQuery";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }], // Refresh posts after mutation
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ variables: { title, content } });
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
