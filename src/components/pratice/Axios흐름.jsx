import axios from 'axios';
import React, { useEffect, useState } from 'react'

//현재 코드의 문제점
//1.현재 코드는 1인 개발자 시점에 적합함(협업에서는 부적절)
//2.비동식 방식으로 인해 가독성이 떨어진다
const Axios흐름 = () => {
  const [num,setNum] = useState(0);

  useEffect(()=>{
    if(num !=0)
      //받은 게시글 번호에 달린 댓글 목록 조회
    axios.get()
    .then().catch()
    

    axios.get('/api/test/1')
    .then(res=>{
      //서버에서 받은 게시글 번호를 num에 저장
      setNum(res.data);
    })
    .catch();
  },[])


  return (
    <div>Axios흐름</div>
  )
}

export default Axios흐름
