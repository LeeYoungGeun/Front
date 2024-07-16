import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "./api";
import "./Mypage.css";

function Mypage() {
  //토큰값 불러오는 쿠키 훅
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();

  useEffect(() => {
    //토큰이 없을 시 접근 불가.
    if (!cookies.accessToken) {
      alert("권한이 없습니다.");
      navigate("/login");
    }
  }, [cookies, navigate]);

  return (
    <div className="mypageBackground">
      <div className="mypage-container">
        <div className="mypage-form">
          <h1>마이페이지</h1>
          <Link to="/modifycheck"><button className="modify">회원정보수정</button></Link>
          <Link to="/checkpw"><button className="danger">계정탈퇴</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Mypage;