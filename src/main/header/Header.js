import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import {
  MainHeader, 
  MainHeaderLogoArea, MainHeaderSearchArea, MainHeaderButtonArea,
  SearchBar,
  Button
} from '../Main';

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
        <SearchBar></SearchBar>
      </MainHeaderSearchArea>
      <MainHeaderButtonArea>
        {isAuthenticated ? (
          <>
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <>
            <Link to="/login"><Button>로그인</Button></Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/signup"><Button>회원가입</Button></Link>
          </>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/#"><Button>게시판</Button></Link>
      </MainHeaderButtonArea>
    </MainHeader>
  );
}

export default Header;