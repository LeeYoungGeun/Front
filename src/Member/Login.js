import React, { useState } from "react";
import api from "./apiTest";
import "./Login.css";


function Login(){
    const [loginData, setLoginData] = useState({
        mid: '',
        mpw: ''
      });
    
      
      const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
      };
    
      
    
      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await api.post('/api/auth/login', loginData);
          console.log(response.data);
          // 로그인 성공 처리 (예: 토큰 저장, 리다이렉트 등)
        } catch (error) {
          console.error('로그인 실패:', error);
        }
      };

    return(
    <div>
      <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>로그인</h2>
        <input
          name="mid"
          value={loginData.mid}
          onChange={handleLoginChange}
          placeholder="아이디"
        />
        <input
          name="mpw"
          type="password"
          value={loginData.mpw}
          onChange={handleLoginChange}
          placeholder="비밀번호"
        />
        <button type="submit">로그인</button>
      </form>
      </div>
    </div>
    )
}

export default Login;