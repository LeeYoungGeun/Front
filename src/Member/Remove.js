import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "./api";
import "./SignUp.css";

function CheckPw() {
  const [mpw, setMpw] = useState("");
  const [cookies, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/api/auth/checkPwRemove", { mpw })
      .then(response => {
        alert(response.data);
        removeCookie('accessToken');
        removeCookie('refreshToken');
        navigate("/");  // 삭제 후 메인 페이지로 이동
      })
      .catch(error => {
        console.error(error);
        alert("비밀번호를 확인해주세요.");
      });
  };

  return (
    <div className="signupBackground">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>정말 탈퇴 하시겠습니까?</h1>
          <input 
            placeholder="비밀번호 입력" 
            type="password" 
            value={mpw} 
            onChange={(e) => setMpw(e.target.value)} 
          />
          <button type="submit">탈퇴</button>
        </form>
      </div>
    </div>
  );
}

export default CheckPw;