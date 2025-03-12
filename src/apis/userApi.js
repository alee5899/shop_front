import axios from "axios"

/**
 * 회원가입
 */
export const regUser = (joinData) => {
  const response = axios.post('/api/users',joinData);
  return response;
}

/** 
 * 로그인
 */
export const loginUser= (loginData) => {
  const response = axios.get(
                      '/api/users/login',
                      {params:loginData}
                      )
  return response;
}