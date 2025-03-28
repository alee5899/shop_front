import axios from 'axios'
import React from 'react'
import { useState } from 'react'
//비동기가 재렌더링할때 state함수 실행안함

const UploadTest = () => {

  //첨부파일 input 태그에서 선택한 파일을 저장할 변수
  //처음에는 아무파일이 없으니까 null로 설정
  const [firstFile,setfirstFile] = useState(null)

  //첨부파일 input 태그에서 선택한 여러 파일을 저장할 변수
  const [secondFiles,setSecondFiles] = useState(null)

  //자바로 데이터를 전달할 때 문자뿐만 아니라 파일 데이터도 가져간다는 것을 설정
  //자바는 일반데이터를 가져갈때 무조건 문자로 가져가지만 이렇게 써주면 파일데이터는  타입을 'multipart/form-data'로 가져갈수있다
  const fileConfig = {headers : {'Content-Type' : 'multipart/form-data'}}

  
  
  
  const sendFile =() => {
    //첨부파일 데이터를 자바로 전달하기 위해서는 FormData() 객체를 사용해야 함
    //form 데이터 객체 생성 : 첨부파일,input 태그 등의 모든 데이터를 자바로 가져갈수 있는 객체
    const form = new FormData();        
    // form.append('데이터의 이름','실제로 전달할 데이터');
    form.append('bookName','hong');
    form.append('bookPrice',20);
    form.append('firstFile',firstFile);

    //post() 메서드의 세번째 매개변수로 fileConfig를 전달(이거해야 파일 첨부 됨)
    axios.post(
      '/api/test/upload1'
      ,form 
      ,fileConfig)
    .then().catch()
  }
  return (
    <div>
      <input  
      //multiple //이 속성을 사용하면 한 번에 여러 파일 선택 가능
      type="file"
      onChange={e =>{
        //e.target.files : 선택한 파일들의 정보
        console.log(e.target.files)
        //e.target.files[0] :선택한 첫번째 파일의 정보
        console.log(e.target.files[0])
        
        //파일을 선택할때마다 선택한 파일을 firstFile에 저장한다.
        setfirstFile(e.target.files[0]);

     
      }} />
      <button type='button' onClick={()=>{sendFile()}}>파일전송1</button>
      <br />
      <input 
      type='file' 
      multiple
      onChange={e =>{ 
        setSecondFiles(e.target.files)
      }}
      />
      <button type='button' onClick={()=>{
        const form2 = new FormData();

        //파일 첨부를 했을때만 
        if(secondFiles !== null){
          //첨부한 파일 갯수만큼 formData에 저장
          for(const eachFile of secondFiles){
            form2.append('files',eachFile);
          }
        }


        axios.post('/api/test/upload2',form2,fileConfig)
        .then().catch()
      }}>다중 파일 전송</button>
    </div>
  )
}

export default UploadTest