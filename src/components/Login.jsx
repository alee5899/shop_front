import React, { useState } from 'react'
import styles from './Login.module.css'
import ShopInput from '../common_component/ShopInput'
import ShopButton from '../common_component/ShopButton'
import axios from 'axios'
import { loginUser } from '../apis/userApi'
// axios.get으로 여러 데이터를 전달하는방법
//axios.get('url',{params:전달할 데이터})

// 전달할 데이터는 객체형식으로 전달

// 위 방식으로 전달한 데이터는스프링에서 
// 1. @RequestParam을 사용해서 받거나,
// 2. DTO객체로 데이터를 받으면 된다
// PS. 리액트 2번 PDF Query string으로 전달된 데이터를 받는 방식(페이지번호 23번)
const Login = () => {
  const[loginData,setloginData]= useState({
    userId: '',
    userPw:''
  });

    const changeLoginData = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const login = () => {
    loginUser(loginData)
      .then(res => {
        console.log(res.data);
  
        // 자바에서 null 데이터가 넘어오면 ''(빈문자)로 받는다
        if (res.data === '') {
          alert('실패');
        } 
        else {
          alert('성공');
         sessionStorage.setItem('userId', res.data.userId)
         sessionStorage.setItem('userPw', res.data.userPw)
         sessionStorage.setItem('userRoll', res.data.userRoll)
         //로그인에 성공하면 
         //sessionStorage에 로그인하는 회원의 아이디, 이름, 권한 정보를 저장한다
        }
      })
      .catch();
  };
  return (
    <div className={styles.container}>
      <h3>로그인</h3>
      <div className={styles.contentContainer}>
        <div>
          <p>아이디</p>
          <ShopInput 
          size='wide'
          name='userId'
          value={loginData.userId}
          onChange={e=> changeLoginData(e)}/>
          </div>
        <div>
        <p>비밀번호</p>
        <ShopInput 
        size='wide' 
        type='password'
        name='userPw'
        value={loginData.userPw}
        onChange={e=> changeLoginData(e)}/>
        </div>
        <div>
          <ShopButton 
          title='로그인'
          click={()=>{login()}}/>
        </div>
      </div>
    </div>
  )
}

export default Login