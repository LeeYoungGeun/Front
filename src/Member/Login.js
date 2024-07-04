import React, { useState } from "react";
import api from "./api";
import "./Login.css";
import { Link } from "react-router-dom";


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
          //로그인성공
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
        <Link to="/SignUp"><p>회원가입</p></Link>
      </form>
      </div>
    </div>
    )
}

export default Login;