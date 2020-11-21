import React from "react";
import Navbar from "../components/Nav";
import PostList from "../components/PostList";
import BottomNav from "../components/BottomNav";

const PostListPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <PostList></PostList>
      <BottomNav></BottomNav>
    </div>
  );
};

export default PostListPage;
