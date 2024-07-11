import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "./api";
import "./Mypage.css";

function mypage() {
 

  return (
    <div className="mypageBackground">
      <div className="mypage-container">
        <div className="mypage-form">
          <h1>마이페이지</h1>
          <button className="modify">회원정보수정</button>
          <button className="modify">비밀번호수정</button>
          <button className="danger">계정탈퇴</button>
        </div>
      </div>
    </div>
  );
}

export default mypage;
