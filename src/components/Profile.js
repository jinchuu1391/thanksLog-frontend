import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthTemplate from "./AuthTemplate";
import img from "../img/profile.png";
import timeConverter from "../helper/timeConverter";

const ProfileWrapper = styled(AuthTemplate)`
  width: 700px;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  height: 50%;
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  .button {
    color: green;
    cursor: pointer;
  }
  .imageSection {
    img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
    }
  }
  .userInfoSection {
    display: flex;
    flex-direction: column;
  }
  .rightSection {
    display: flex;
    flex-direction: column;
  }
`;

const PostInfo = styled.div`
  height: 50%;
`;

const PostItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  &:first-child {
    padding-top: 2rem;
  }
  & + & {
    border-top: 1px solid lightgrey;
  }
  .title {
    cursor: pointer;
  }
`;

const PostItem = withRouter(({ post, history }) => {
  const goToPostPage = () => {
    history.push(`/${post.id}`);
  };
  return (
    <PostItemWrapper>
      <div className="title" onClick={goToPostPage}>
        {post.title}
      </div>
      <div className="createdAt">{timeConverter(post.createdAt)}</div>
    </PostItemWrapper>
  );
});

const NeedLogin = styled.div`
  text-align: center;
  font-size: 3rem;
`;

const Profile = withRouter(({ match }) => {
  const [profileData, setProfileData] = useState("");
  const {
    username,
    email,
    profile_photo_url,
    introduce,
    Contents,
  } = profileData;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    axios
      .post(`http://localhost:4000/auth/mypage/${match.params.email}`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setProfileData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const postItems = Contents
    ? Contents.map((post) => {
        return <PostItem post={post} key={post.id}></PostItem>;
      })
    : [];

  return (
    <>
      {isLoggedIn ? (
        <ProfileWrapper>
          <UserInfo>
            <div className="imageSection">
              <img src={profile_photo_url} alt="프사"></img>
              <div className="button">사진 올리기</div>
              <div className="button">사진 삭제</div>
            </div>
            <div className="userInfoSection">
              <div>{username}</div>
              <div>{email}</div>
              <div>{introduce}</div>
            </div>
            <div className="rightSection">
              <div className="button">수정하기</div>
              <div className="button">탈퇴하기</div>
            </div>
          </UserInfo>
          <PostInfo>{postItems}</PostInfo>
        </ProfileWrapper>
      ) : (
        <ProfileWrapper>
          <NeedLogin>로그인 해주세요:D</NeedLogin>
        </ProfileWrapper>
      )}
    </>
  );
});

export default Profile;
