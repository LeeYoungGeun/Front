import React, { useState, useEffect } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import "./Modify.css";
import { useCookies } from "react-cookie";

export function Modify() {
  //회원저장 변수 State
  const [memberData, setMemberData] = useState({
    mid: "",
    mnick: "",
    memail: "",
    mphone: "",
    mpw: ""
  });

  //useCookies훅을 사용하여 토큰를 가져옴.
  const [cookies] = useCookies(['accessToken']);


  const navigate = useNavigate();

  useEffect(() => {
    //토큰이 없으면 접근불가.
    if (!cookies.accessToken) {
      alert("권한이 없습니다.");
      navigate("/login");
    }
  }, [cookies, navigate]);

  useEffect(() => {
    //서버에 데이터 불러온 세션 저장.
    const storedMemberData = sessionStorage.getItem("memberData");  
    if (storedMemberData) {
      setMemberData(JSON.parse(storedMemberData));
    } else {
      api.get("/api/auth/modify")
        .then(response => {
          const { mid, mnick, memail, mphone } = response.data;
          const data = { mid, mnick, memail, mphone, mpw: "" }; // 비밀번호는 빈 문자열로 초기화
          setMemberData(data);
          sessionStorage.setItem("memberData", JSON.stringify(data));
        })
        .catch(error => console.error(error));
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...memberData };
    if (!dataToSend.mpw) {
      delete dataToSend.mpw; // 수정페이지 비밀번호가 비어있으면 기존 비밀번호 유지.
    }
    api.put("/api/auth/modify", dataToSend)
      .then(response => {
        alert(response.data);
        sessionStorage.removeItem("memberData");  //수정이 완료되면 세션에 저장한 데이터 제거.
        navigate("/mypage");  // 수정 후 mypage로 이동
      })
      .catch(error => console.error(error));
  };

  //입력값이 변경될 때 상태변수 변경.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  return (
    <div className="modifyBackground">
      <div className="modify-container">
        <form className="modify-form" onSubmit={handleSubmit}>
          <h2>회원정보수정</h2>
          <input name="mid" value={memberData.mid} disabled />
          <input name="mnick" placeholder="닉네임" value={memberData.mnick} onChange={handleChange} />
          <input name="memail" placeholder="이메일" type="email" value={memberData.memail} onChange={handleChange} />
          <input name="mphone" placeholder="핸드폰번호" value={memberData.mphone} onChange={handleChange} />
          <input name="mpw" placeholder="비밀번호" type="password" value={memberData.mpw} onChange={handleChange} />
          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
}

export function ModifyCheck() {
  //비밀번호를 저장할 변수 
  const [mpw, setMpw] = useState("");

  const navigate = useNavigate();
  
  //쿠키값 가져오는 훅.
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    //토큰이 없으면 접근불가.
    if (!cookies.accessToken) {
      alert("권한이 없습니다.");
      navigate("/login");
    }
  }, [cookies, navigate]);

  //비밀번호가 맞으면 정보 수정 페이지 이동.
  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/api/auth/checkPwModify", { mpw })
      .then(response => {
        navigate("/modify");
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="modifyBackground">
      <div className="modify-container">
        <form className="modify-form" onSubmit={handleSubmit}>
          <h2>비밀번호를 입력해주세요</h2>
          <input placeholder="비밀번호 입력" type="password" value={mpw} onChange={(e) => setMpw(e.target.value)} />
          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
}
