import React, { useState } from "react";
import api from "./apiTest";


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
    <h2>회원가입</h2>
      <form onSubmit={handleSignUp}>
        <input name="mid" value={signUpData.mid} onChange={handleSignUpChange} placeholder="ID" />
        <input name="mpw" type="password" value={signUpData.mpw} onChange={handleSignUpChange} placeholder="Password" />
        <input name="checkMpw" type="password" value={signUpData.checkMpw} onChange={handleSignUpChange} placeholder="PasswordCheck" />
        <input name="mname" value={signUpData.mname} onChange={handleSignUpChange} placeholder="Name" />
        <input name="mnick" value={signUpData.mnick} onChange={handleSignUpChange} placeholder="Nickname" />
        <input name="memail" type="email" value={signUpData.memail} onChange={handleSignUpChange} placeholder="Email" />
        <input name="mphone" value={signUpData.mphone} onChange={handleSignUpChange} placeholder="Phone" />
        <button type="submit">회원가입</button>
      </form>
        </div>
    )
}

export default SignUp;