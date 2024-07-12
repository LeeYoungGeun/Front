import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function CheckPw() {

  return (
    <div className="signupBackground">
      <div className="signup-container">
        <form className="signup-form">
          <h1>정말 탈퇴 하시겠습니까?</h1>
          <input placeholder="비밀번호 입력" />
          <button type="submit">탈퇴</button>
        </form>
      </div>
    </div>
  );
}

export default CheckPw;
