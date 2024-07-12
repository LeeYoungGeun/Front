import React, { useState, useEffect } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import "./Modify.css";


export function Modify() {
  const [memberData, setMemberData] = useState({
    mid: "",
    mnick: "",
    memail: "",
    mphone: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedMemberData = sessionStorage.getItem("memberData");
    if (storedMemberData) {
      setMemberData(JSON.parse(storedMemberData));
    } else {
      api.get("/api/auth/modify")
        .then(response => {
          const { mid, mnick, memail, mphone } = response.data;
          const data = { mid, mnick, memail, mphone };
          setMemberData(data);
          sessionStorage.setItem("memberData", JSON.stringify(data));
        })
        .catch(error => console.error(error));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("memberData", JSON.stringify(memberData));
  }, [memberData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put("/api/auth/modify", memberData)
      .then(response => {
        alert(response.data);
        sessionStorage.removeItem("memberData");
        navigate("/mypage");  // 수정 후 mypage로 이동
      })
      .catch(error => console.error(error));
  };

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
          <input name="memail" placeholder="이메일" value={memberData.memail} onChange={handleChange} />
          <input name="mphone" placeholder="핸드폰번호" value={memberData.mphone} onChange={handleChange} />
          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
}

export function ModifyCheck() {
  const [mpw, setMpw] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/api/auth/checkPw", { mpw }, { params: { removeCheck: false } })
      .then(response => {
        alert(response.data);
        navigate("/api/auth/modifypw");
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

export function ModifyPw() {
  const [mpw, setMpw] = useState("");
  const [checkMpw, setCheckMpw] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mpw !== checkMpw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    api.put("/api/auth/modify", { mpw, checkMpw })
      .then(response => {
        alert(response.data);
        sessionStorage.removeItem("memberData");
        navigate("/mypage");
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="modifyBackground">
      <div className="modify-container">
        <form className="modify-form" onSubmit={handleSubmit}>
          <h2>변경할 비밀번호 입력</h2>
          <input placeholder="비밀번호 입력" type="password" value={mpw} onChange={(e) => setMpw(e.target.value)} />
          <input placeholder="비밀번호 재입력" type="password" value={checkMpw} onChange={(e) => setCheckMpw(e.target.value)} />
          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
}
