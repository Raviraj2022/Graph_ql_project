import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    getPosts {
      id
      title
      content
    }
  }
`;

export const CREATE_POST = gql`
  mutation ($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;
