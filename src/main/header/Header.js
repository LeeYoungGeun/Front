import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { MainHeader } from "../Main";
import SearchInputComponent from "../body/SearchInputComponent";

const MainHeaderLogoArea = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
`;

const MainHeaderSearchArea = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = () => {
  return (
    <SearchInputComponent 
      type="text" 
      placeholder="검색어를 입력해 주세요." 
    />
  );
};

const MainHeaderButtonArea = styled.div`
  width: 20%;
  display: flex;
  margin-left: 50px;
  align-items: center;
`;

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  
  &:hover {
    background-color: transparent;
    color: red;
    border-color: white;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 10px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 8px;
  }

  /* 버튼이 줄바꿈되지 않도록 설정 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("쿠키 확인:", cookies.accessToken); // 쿠키 값을 확인하기 위해 콘솔에 출력
    if (cookies.accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [cookies.accessToken]);

  const handleLogout = () => {
    removeCookie('accessToken', { path: '/' });
    removeCookie('refreshToken', { path: '/' });
    setIsAuthenticated(false);
    navigate('/');
    alert("로그아웃 되었습니다.");
  };

  return (
    <MainHeader>
      <MainHeaderLogoArea>
        <Link to="/">TFT</Link>
      </MainHeaderLogoArea>
      <MainHeaderSearchArea>
        <SearchBar />
      </MainHeaderSearchArea>
      <MainHeaderButtonArea>
        {isAuthenticated ? (
          <>
            <Button onClick={handleLogout}>로그아웃</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="mypage"><Button>내계정</Button></Link>
          </>
        ) : (
          <>
            <Link to="/login"><Button>로그인</Button></Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/signup"><Button>회원가입</Button></Link>
          </>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/board"><Button>게시판</Button></Link>
      </MainHeaderButtonArea>
    </MainHeader>
  );
}

export default Header;
