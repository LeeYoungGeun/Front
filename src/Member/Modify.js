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
          <input placeholder="닉네임" />
          <input  placeholder="이메일" />
          <input placeholder="핸드폰번호" />
          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
}

function ModifyCheck(){

  return (
    <div className="modifyBackground">
      <div className="modify-container">
        <form className="modify-form" >
          <h2>비밀번호를 입력해주세요</h2>
          <input placeholder="비밀번호 입력" />
          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
}

function ModifyPw(){

  return (
    <div className="modifyBackground">
      <div className="modify-container">
        <form className="modify-form" >
          <h2>변경할 비밀번호 입력</h2>
          <input placeholder="비밀번호 입력" />
          <input placeholder="비밀번호 재입력" />
          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
}

export default { Modify, ModifyCheck, ModifyPw };
