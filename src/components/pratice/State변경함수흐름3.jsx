import React, { useEffect, useState } from 'react'

const State변경함수흐름3 = () => {
   const [student,setStudent] = useState({
      name : 'h',
      age : 20,
      score: 90
    });
  
    const changeData = () => {
      setStudent((state)=>{
        return {
          ...state,
          name:'k'
        }
      });
  
      setStudent((state)=>{
        return{
          ...state,
          age:30
        }
      })
  
      console.log('함수안');
      console.log(student);
    }
  
    useEffect(()=>{
      changeData();
    },[])
    
    console.log('함수밖')
    console.log(student);
  
  return (
    <div>State변경함수흐름3</div>
  )
}

export default State변경함수흐름3