import React, { useState, useEffect } from "react";
import api, { setAuthToken } from "./api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Modify.css";

export function Modify() {
  const [memberData, setMemberData] = useState({
    mid: "",
    mnick: "",
    memail: "",
    mphone: "",
    mpw: ""
  });

  const [originalData, setOriginalData] = useState({
    mnick: "",
    memail: ""
  });

  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.accessToken) {
      alert("권한이 없습니다.");
      navigate("/login");
    } else {
      setAuthToken(cookies.accessToken);
      api.get("/api/auth/modify")
      .then(response => {
        const { mid, mnick, memail, mphone } = response.data;
        setMemberData({ mid, mnick, memail, mphone, mpw: "" });
        setOriginalData({ mnick, memail });
      })
      .catch(error => {
        console.error(error);
        alert("유저 정보를 불러오는 데 실패했습니다.");
      });
    }
  }, [cookies, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { mnick, memail, mphone } = memberData;

    // 빈 값 확인
    if (!mnick) {
      alert("닉네임을 입력해주세요");
      return;
    }
    if (!memail) {
      alert("이메일을 입력해주세요");
      return;
    }
    if (!mphone) {
      alert("핸드폰 번호를 입력해주세요");
      return;
    }

    const dataToSend = { ...memberData };
    if (!dataToSend.mpw) {
      delete dataToSend.mpw;
    }

    try {
      const response = await api.put("/api/auth/modify", { ...dataToSend, originalMnick: originalData.mnick, originalMemail: originalData.memail });
      alert(response.data);
      navigate("/mypage");
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else {
        console.error(error);
        alert("수정 중 오류가 발생했습니다.");
      }
    }
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
  const [mpw, setMpw] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    if (!cookies.accessToken) {
      alert("권한이 없습니다.");
      navigate("/login");
    } else {
      setAuthToken(cookies.accessToken);
    }
  }, [cookies, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/checkPw", { mpw });
      if (response.status === 200) {
        navigate("/modify");
      } 
    } catch (error) {
      console.error(error);
      alert("비밀번호가 일치하지 않습니다.");
    }
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

