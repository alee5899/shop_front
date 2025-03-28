import React, { useEffect, useState } from "react";
import ShopInput from "../../common_component/ShopInput";
import ShopButton from "../../common_component/ShopButton";
import ShopSelect from "../../common_component/ShopSelect";
import styles from "./Join.module.css";
import { regUser } from "../../apis/userApi";

const Join = () => {
  //id 입력이 잘못되었을 때 나타나는 에러 메세지
  const [errorMsg, setErrorMsg] = useState({
    userId: "",
    userPw: "",
    userTel: "",
  });

  //입력한 데이터를 저장하기 위한 변수
  const [joinData, setJoinData] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userEmail: "", //완성된 이메일
    email1: "",
    email2: "@gmail.com",
    userTel: "",
    tel1: "",
    tel2: "",
    tel3: "",
  });
  //email1,email2 값이 변경될때만 실행
  useEffect(() => {
    setJoinData({
      ...joinData,
      userEmail: joinData.email1 + joinData.email2,
    });
  }, [joinData.email1, joinData.email2]);

  //tel1,te12,tel3 값이 변경될때만 실행
  useEffect(() => {
    setJoinData({
      ...joinData,
      userTel: [joinData.tel1, joinData.tel2, joinData.tel3].join("-"),
    });
  }, [joinData.tel1, joinData.tel2, joinData.tel3]);

  //키보드로 데이터를 입력할때마다 실행되는 함수
  const changeJoinData = (e) => {
    setJoinData({
      ...joinData,
      [e.target.name]: e.target.value,
    });
  };

  // 회원가입 전 유효성 검사
  const joinValidate = () => {
    let result = 0;
    setErrorMsg((state) => {
      return {
        userId: "",
        userPw: "",
      };
    });
    //아이디 정규식 - 4~16글자의 영문자로만 이루어진 정규식
    const regex_id = /^[a-zA-Z]{4,16}$/;

    if (!regex_id.test(joinData.userId)) {
      result = 1;
      setErrorMsg((state) => {
        return {
          ...state,
          userId: "잘못된 아이디입니다",
        };
      });
    }
    //비밀번호 정규식 - 영어는 소문자나 대문자 + 숫자는 포함

    const regex_pw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
    regex_pw.test(joinData.userPw);
    if (!regex_pw.test(joinData.userPw)) {
      result = 1;
      setErrorMsg((state) => {
        return {
          ...state,
          userPw: "잘못된 비밀번호입니다",
        };
      });
    }

    //연락처 정규식
    const regex_tel = /^(01[0-9]-\d{3,4}-\d{4}|0[2-9]-\d{3,4}-\d{4})$/;
    if (!regex_tel.test(joinData.userTel)) {
      result = 1;
      setErrorMsg((state) => {
        return {
          ...state,
          userTel: "잘못된 연락처입니다",
        };
      });
    }

    return result;
  };
  //회원가입 버튼 클릭 시 회원가입 진행
  const join = () => {
    //유효성 검사

    const result = joinValidate();

    if (result === 0) {
      regUser(joinData)
        .then((res) => {
          //회원가입 됐을때
          if (res.data) {
            alert("성공");
          }
          //회원가입 실패했을때->아이디가 중복일때
          else {
            setErrorMsg({
              ...errorMsg,
              userId: "중복된 아이디입니다.",
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  console.log(joinData);
  return (
    <div className={styles.container}>
      <h3>회원 가입하기</h3>
      <div className={styles.content_container}>
        <div className={styles.form}>
          <p>아이디</p>
          <div>
            <ShopInput
              size="wide"
              name="userId"
              value={joinData.userId}
              onChange={(e) => changeJoinData(e)}
            />
          </div>
          {errorMsg.userId && <p className="error-msg">{errorMsg.userId}</p>}
        </div>
        <div className={styles.form}>
          <p>비밀번호</p>
          <div>
            <ShopInput
              size="wide"
              type="password"
              name="userPw"
              value={joinData.userPw}
              onChange={(e) => changeJoinData(e)}
            />
          </div>
          {errorMsg.userPw && <p className="error-msg">{errorMsg.userPw}</p>}
        </div>
        <div className={styles.form}>
          <p>이름</p>
          <div>
            <ShopInput
              size="wide"
              name="userName"
              value={joinData.userName}
              onChange={(e) => changeJoinData(e)}
            />
          </div>
        </div>
        <div className={styles.form}>
          <p>이메일</p>
          <div className={styles.email_div}>
            <ShopInput
              name="email1"
              value={joinData.email1}
              onChange={(e) => changeJoinData(e)}
            />
            <ShopSelect
              name="email2"
              value={joinData.email2}
              onChange={(e) => changeJoinData(e)}
            >
              <option value="@gmail.com">@gmail.com</option>
              <option value="@naver.com">@naver.com</option>
            </ShopSelect>
          </div>
        </div>
        <div className={styles.form}>
          <p>연락처</p>
          <div className={styles.tel_div}>
            <ShopInput
              size="wide"
              name="tel1"
              value={joinData.tel1}
              onChange={(e) => changeJoinData(e)}
            />
            <ShopInput
              size="wide"
              name="tel2"
              value={joinData.tel2}
              onChange={(e) => changeJoinData(e)}
            />
            <ShopInput
              size="wide"
              name="tel3"
              value={joinData.tel3}
              onChange={(e) => changeJoinData(e)}
            />
          </div>
          {errorMsg.userTel && <p className="error-msg">{errorMsg.userTel}</p>}
        </div>
        <div className={styles.btn_div}>
          <ShopButton
            title="회원가입"
            click={(e) => {
              join();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Join;
