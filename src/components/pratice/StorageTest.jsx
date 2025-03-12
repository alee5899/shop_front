import React, { useEffect, useState } from 'react'

/**
 * sessionStorage, localStorage는 웹 상에 데이터를 저장할 수있는 공간이다
 * 이 두 곳에 저장된 데이터는 개발자모드의 Application 탭에서 확인 가능 
 * sessionStorage, localStorage는 새로고침에도 데이터는 살아있다.
 * localStorage는 탭 간에 데이터를 공유한다
 * sessionStorage 탭 간에 데이터를 공유하지 않는다
 * localStorage는 웹 브라우저가 종료되도 데이터가 살아있다 영구보존
 * sessionStorage 웹 브라우저가 종료되면 데이터가 지워진다
 * 이 두 곳에는 객체 데이터 저장 불가! 하지만 다른 방법으로 객체 사용 가능
 */
const StorageTest = () => {
  // localStorage에 데이터를 저장하는 법
  useEffect(()=>{
    localStorage.setItem('name','hong')
    localStorage.setItem('age',20) 

    // sessionStorage.setItem('addr', '울산시')
  },[])
  return (
    <>
      <div>StorageTest</div>
      <button type='button' onClick={()=>{
        localStorage.removeItem('name');
        sessionStorage.removeItem('addr')
      }}>데이터 삭제 버튼</button>

      <button type='button' onClick={()=>{
        const age = localStorage.getItem('age')
        const addr = localStorage.getItem('addr')
        alert(`age = ${age}, addr = ${addr}`)
      }}>데이터 확인 버튼</button>
    </>
  )
}

export default StorageTest