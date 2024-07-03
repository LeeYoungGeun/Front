import React, { useState } from "react";
import api from "./apiTest";
import "./SignUp.css";


function SignUp(){
    const [signUpData, setSignUpData] = useState({
        mid: '',
        mpw: '',
        checkMpw: '',
        mname: '',
        mnick: '',
        memail: '',
        mphone: ''
      });
      const handleSignUpChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
      };

      const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          const response = await api.post('/api/auth/signUp', signUpData);
          console.log(response.data);
          // 회원가입 성공 처리
        } catch (error) {
          console.error('회원가입 실패:', error);
        }
      };


    return(
        <div>
        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSignUp}>
            <h2>회원가입</h2>
            <input name="mname" value={signUpData.mname} onChange={handleSignUpChange} placeholder="이름" />
            <input name="mid" value={signUpData.mid} onChange={handleSignUpChange} placeholder="아이디" />
            <input name="mpw" type="password" value={signUpData.mpw} onChange={handleSignUpChange} placeholder="비밀번호" />
            <input name="checkMpw" type="password" value={signUpData.checkMpw} onChange={handleSignUpChange} placeholder="비밀번호 확인" />
            <input name="mnick" value={signUpData.mnick} onChange={handleSignUpChange} placeholder="닉네임" />
            <input name="memail" type="email" value={signUpData.memail} onChange={handleSignUpChange} placeholder="이메일" />
            <input name="mphone" value={signUpData.mphone} onChange={handleSignUpChange} placeholder="핸드폰번호" />
            <button type="submit">회원가입</button>
          </form>
        </div>
      </div>
    )
}

export default SignUp;