import React, { useEffect, useState } from 'react'

/*
state 변경함수의 인자로는 데이터,함수가 전달한다
state 변경함수의 인자로 전달되는 함수를 updater라 부른다
인자로 함수를 사용하면 항상 최신의 state 값을 전달받을 수 있음*/

const State변경함수흐름2 = () => {
  const [num,setNum] = useState(0);

  const changeNum =() =>{
    // setNum(num +  1);
    // setNum(num +  1);
    // setNum(num +  1);

    //매개변수 : state변수의 값. 이 값은 최신의 앖을 유지
    // 함수의 리턴 값을 state 변수의 값으로 업데이트
    //아래처럼 코드를 작성한다고 해도 여전히 비동기로 동작
    //state함수는 비동기이기 때문에 console이나 다른거 다하고 나중에 실행
    //updater를 사용한 state변경함수는 state변경함수가 2회연속진행 되면 2번째 state변경함수의 기능이 
    // 첫번째 state변경함수의 결과에 의존적일때 사용
    setNum((state)=>{
      return state + 1
    });
    
        console.log('a = ',num);
    setNum((state)=>{
      return state + 1
    });
        console.log('a = ',num);

    setNum((state)=>{
      return state + 1
    });
  }
  
  useEffect(()=>{
    changeNum();
  },[])

  console.log('b = ',num);


  return (
    <div>State변경함수흐름2</div>
  )
}

export default State변경함수흐름2