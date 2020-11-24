import React from "react";
import Navbar from "../components/Nav";
import PostList from "../components/PostList";
import BottomNav from "../components/BottomNav";

const PostListPage = () => {
  return (
    <div>
      <Navbar>
        "오늘 하루 당신의 크고 작은 감사한 이야기를 나눠주세요. 우리의 일상을
        감사로 물들여요."
      </Navbar>
      <PostList></PostList>
      <BottomNav></BottomNav>
    </div>
  );
};

export default PostListPage;
