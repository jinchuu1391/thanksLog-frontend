import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import timeConverter from "../helper/timeConverter";
import Responsive from "../components/Responsive";

const ProfileWrapper = styled(Responsive)`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  margin-bottom: 10rem;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const SmallButton = styled(Button)`
  width: 120px;
  margin: 0.25rem;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const UserImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 500px;
    height: 500px;
    object-fit: cover;
    border-radius: 30px;
  }
  .buttons {
    display: flex;
    .filebox label,
    .basic {
      margin: 0.25rem;
      width: 120px;
      text-align: center;
      margin-bottom: 0.5rem;
      display: inline-block;
      padding: 0.5rem;
      color: #fff;
      background-color: #343a40;
      cursor: pointer;
      border-radius: 5px;
    }
    .filebox label:hover,
    .basic:hover {
      background-color: grey;
    }

    .filebox input[type="file"] {
      position: absolute;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }
`;
const UserInfoDescription = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  padding-left: 2rem;
  font-size: 1.5rem;
  color: #343a40;
  display: flex;
  flex-direction: column;
  .userInfo {
    padding-top: 1rem;
  }
  .userInfo_password {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    .passwordConfirm {
      margin-top: 1rem;
    }
  }
`;
const PostInfoWrapper = styled.div`
  @media (max-width: 768px) {
    width: 500px;
  }
  display: flex;
  flex-direction: column;
`;

const PostItemWrapper = styled.div`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  font-size: 1.5rem;
  color: #343a40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  &:hover {
    color: grey;
  }
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
const NeedLogin = styled.div`
  text-align: center;
  font-size: 3rem;
`;
const SmallInput = styled.input`
  width: 50%;
  height: 2rem;
  font-size: 1rem;
  color: #343a40;
  border: 1px solid grey;
  border-radius: 5px;
  outline: none;
  padding: 1rem;
`;
const BigInput = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  color: #343a40;
  border: 1px solid grey;
  border-radius: 5px;
  outline: none;
  padding: 1rem;
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

const Profile = withRouter(({ match }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    profile_photo_url: "",
    introduce: "",
    Contents: [],
  });
  const {
    username,
    email,
    profile_photo_url,
    introduce,
    Contents,
  } = profileData;
  const [currentUser, setCurrentUser] = useState("");

  const [passwordToChange, setPasswordToChange] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [basicProfile, setBasicProfile] = useState(false);
  const nameToEdit = useSelector((state) => state.auth.nameToEdit);
  const introduceToEdit = useSelector((state) => state.auth.introduceToEdit);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const editMode = useSelector((state) => state.auth.editMode);

  const rerenderSign = useSelector((state) => state.rerender.rerender);
  const emailFromParams = match.params.email;

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(`http://54.180.83.133:3000/auth/mypage/${emailFromParams}`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setCurrentUser(res.data.currentUser);
        setProfileData(res.data.userInfo);
        dispatch({
          type: "PROFILE_LOADED",
          name: res.data.userInfo.username,
          introduce: res.data.userInfo.introduce,
        });
      })
      .catch((err) => console.log(err));
    return () => {
      dispatch({ type: "PROFILE_INITIALIZE" });
      dispatch({ type: "PROFILE_EDIT_MODE_CHANGE", mode: false });
    };
  }, [rerenderSign, emailFromParams]);

  const postItems = Contents
    ? Contents.map((post) => {
        return <PostItem post={post} key={post.id}></PostItem>;
      })
    : [];

  const profileEditHandler = () => {
    dispatch({ type: "PROFILE_EDIT_MODE_CHANGE", mode: true });
  };

  const onCancel = () => {
    dispatch({ type: "NAME_CHANGE", name: username });
    dispatch({ type: "INTRODUCE_CHANGE", introduce: introduce });
    dispatch({ type: "PROFILE_EDIT_MODE_CHANGE", mode: false });
    setImgPreview(null);
    setBasicProfile(false);
  };
  // 수정사항 적용시 실행 함수
  const onEdited = (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.append("username", nameToEdit);
    Data.append("introduce", introduceToEdit);
    Data.append("img", img);
    Data.append("token", localStorage.getItem("token"));
    Data.append("basicProfile", basicProfile);
    if (passwordToChange.length >= 1) {
      if (passwordToChange === passwordConfirm) {
        if (localStorage.getItem("user") === "test@mail.com") {
          return alert("테스트 계정은 비밀번호를 바꿀 수 없습니다");
        }
        Data.append("password", passwordToChange);
        axios
          .post("http://54.180.83.133:3000/auth/profileupdate", Data, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((res) => {
            setPasswordToChange("");
            setPasswordConfirm("");
            dispatch({ type: "RERENDER" });
          })
          .catch((err) => console.log(err));
      } else {
        alert("비밀번호와 비밀번호 확인란이 일치하지 않습니다");
      }
    } else {
      axios
        .post("http://54.180.83.133:3000/auth/profileupdate", Data, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          setPasswordToChange("");
          setPasswordConfirm("");
          dispatch({ type: "RERENDER" });
        })
        .catch((err) => console.log(err));
    }
  };
  // 이미지 클릭시 실행 함수
  const onImgSelect = (e) => {
    e.preventDefault();
    // img 상태에 파일을 담는다
    setImg(e.target.files[0]);
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = (e) => {
      // 파일이 선택되면 미리보기 화면에 보여주기 위해 파일의 url값을 imgPreview로 할당한다
      setImgPreview(e.target.result);
      setBasicProfile(false);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      // 선택된 파일이 없으면(선택했다가 취소되면) imgPreview를 null로 할당한다
      setImgPreview(null);
      setImg(null);
      setBasicProfile(false);
    }
  };
  const onNameChange = (e) => {
    dispatch({
      type: "NAME_CHANGE",
      name: e.target.value,
    });
  };
  const onIntroduceChange = (e) => {
    dispatch({
      type: "INTRODUCE_CHANGE",
      introduce: e.target.value,
    });
  };
  const onPasswordChange = (e) => {
    setPasswordToChange(e.target.value);
  };
  const onPasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const onBasicImgClick = () => {
    setImg(null);
    setImgPreview(
      "https://user-images.githubusercontent.com/62422486/98907760-b282a200-2502-11eb-9e27-acb392842a92.png"
    );
    setBasicProfile(true);
  };
  return (
    <>
      {isLoggedIn ? (
        <ProfileWrapper>
          {currentUser === email && (
            <ButtonWrapper>
              {editMode ? (
                <>
                  <SmallButton onClick={onCancel}>취소하기</SmallButton>
                  <SmallButton onClick={onEdited}>적용하기</SmallButton>
                </>
              ) : (
                <SmallButton onClick={profileEditHandler}>수정하기</SmallButton>
              )}
            </ButtonWrapper>
          )}
          <UserInfoWrapper>
            <UserImgWrapper>
              <img
                src={imgPreview ? imgPreview : profile_photo_url}
                alt="userImage"
              />
              {editMode && (
                <div className="buttons">
                  <div className="filebox">
                    <label for="ex_file">이미지 업로드</label>
                    <input
                      onChange={onImgSelect}
                      type="file"
                      id="ex_file"
                    ></input>
                  </div>
                  <div className="basic" onClick={onBasicImgClick}>
                    기본 이미지
                  </div>
                </div>
              )}
            </UserImgWrapper>
            <UserInfoDescription>
              <div className="userInfo">{email}</div>
              {editMode ? (
                <form encType="multipart/form-data">
                  <div className="userInfo">
                    <SmallInput
                      placeholder="이름"
                      value={nameToEdit}
                      name="NAME"
                      onChange={onNameChange}
                    ></SmallInput>
                  </div>
                  <div className="userInfo">
                    <BigInput
                      placeholder="소개말"
                      value={introduceToEdit}
                      name="INTRODUCE"
                      onChange={onIntroduceChange}
                    ></BigInput>
                  </div>
                  <div className="userInfo_password">
                    <SmallInput
                      placeholder="바꾸고 싶은 비밀번호"
                      onChange={onPasswordChange}
                    ></SmallInput>
                    <SmallInput
                      placeholder="바꾸고 싶은 비밀번호 확인"
                      className="passwordConfirm"
                      onChange={onPasswordConfirmChange}
                    ></SmallInput>
                  </div>
                </form>
              ) : (
                <>
                  <div className="userInfo">{username}</div>
                  <div className="userInfo">{introduce}</div>
                </>
              )}
            </UserInfoDescription>
          </UserInfoWrapper>
          <PostInfoWrapper>{postItems}</PostInfoWrapper>
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
