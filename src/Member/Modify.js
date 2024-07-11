import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import "./Modify.css";

function Modify() {

 

  return (
    <div className="modifyBackground">
      <div className="modify-container">
        <form className="modify-form" >
          <h2>회원정보수정</h2>
          <input placeholder="이름" />
          <input placeholder="아이디" />
          <input  placeholder="비밀번호" />
          <input placeholder="비밀번호 확인" />
          <input placeholder="닉네임" />
          <input  placeholder="이메일" />
          <input placeholder="핸드폰번호" />
          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
}

export default Modify;
