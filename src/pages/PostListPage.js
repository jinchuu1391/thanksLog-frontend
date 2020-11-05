import React from "react";
import Navbar from "../components/Nav";
import PostList from "../components/PostList";

const PostListPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <PostList></PostList>
    </div>
  );
};

export default PostListPage;
