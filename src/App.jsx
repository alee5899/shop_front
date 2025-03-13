import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './components/UserLayout'
import AdminLayout from './components/AdminLayout'
import ItemForm from './components/ItemForm'
import CateManange from './components/CateManange'
import State변경함수흐름 from './components/pratice/State변경함수흐름'
import Axios흐름 from './components/pratice/Axios흐름'
import As from './components/pratice/Axios흐름'
import ShopButton from './common_component/ShopButton'
import ShopInput from './common_component/ShopInput'
import Join from './components/Join'
import State변경함수흐름2 from './components/pratice/State변경함수흐름2'
import State변경함수흐름3 from './components/pratice/State변경함수흐름3'
import Login from './components/Login'
import StorageTest from './components/pratice/StorageTest'
import { useEffect, useState } from 'react'


function App() {

  //로그인 정보를 저장할 state변수
    const [loginInfo,setLoginInfo] = useState(null);

    //Login.jsx에서 로그인을 성공하면 setLoginInfo()함수를 이용해서
    // 로그인한 정보를 loginInfo 변수에 저장한다
    // 하지만 이 상태에서 새로고침(F5)하면 loginInfo 변수에 저장된 로그인 정보가 사라진다
    // 그래서 새로고침을 하더라도 sessionStorage에 저장된 데이터로 로그인 정보를
    // 유지시켜주기 위해 아래 useEffect에서 한 번 더 로그인 정보를 가져온다
    //설명
    //로그인하면 
    // 1.logInfo변수에 로그인 정보 저장
    // sessionStorage에도 로그인 정보 저장

    // 새로고침하면
    
    // 1.1.logInfo변수의 데이터는 초기화되낟
    // sessionStorage에 저장된 데이터는 유지된다
    // 3.app.jsx를 다시 읽고- -> useEffect가 실행
    // -->sessionStorage에 있는 로그인 정보를 가져와서logInfo 변수에 다시 넣어준다
    useEffect(()=>{
      //sessionStorage에 있는 loginInfo데이터 가져오기
      // loginInfo 데이터가 없다면 로그인 안한것 -> null
      // 이렇게 가져온 데이터는 json 형태이다.
      const strLoginInfo = sessionStorage.getItem('loginInfo');
    
      // sesstionStorage에 로그인 정보가 있으면
      if(strLoginInfo != null){
        // sesstionStorage에서 받은 데이터를 객체로 
        // 변환된 loginInfo객체에는 로그인한 회원의 아이디,이름,권한 정보가 들어있다
        setLoginInfo( JSON.parse(strLoginInfo))
      }
    },[])



  return (
    <div className='container'>
      <StorageTest/>

      <Routes>

        {/* 유저가 접속하는 페이지 */}
        <Route path='/' element={<UserLayout loginInfo={loginInfo} setLoginInfo={setLoginInfo}/>} >

        {/* 상품목록 페이지 */}
        <Route path='' element={<div>상품목록 페이지</div>}/>
        
        {/* 상품 상세 페이지 */}
        <Route path='detail' element={<div>상품 상세 페이지</div>}/>

        {/* 회원가입 */}
        <Route path='join' element={<Join/>}/>

        {/* 로그인 */}
        <Route path='login' element={<Login setLoginInfo = {setLoginInfo}/>}/>

      </Route>  



        {/* 관리자가 접속하는 페이지 */}
        <Route path='/admin' element={<AdminLayout/>}>

        {/* 상품등록 */}
        <Route path='reg-item' element={<ItemForm/>}/>

        {/* 카테고리 관리 */}
        <Route path='cate-manage' element={<CateManange/>}/>

        {/* 회원관리 */}
        <Route path='user-manage' element={<div>회원관리</div>}/>

        </Route>
        {/* 관리자가 접속하는 페이지 */}


        
      </Routes>
    </div>
  )
}

export default App
