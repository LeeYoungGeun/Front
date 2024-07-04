import './App.css';
import React from 'react';
import {
  MainContainer, 
  MainHeader, 
  MainHeaderLogoArea, MainHeaderSearchArea, MainHeaderButtonArea,
  MainBody,
  MainBodyRollingBannerArea,
  MainBodyMovieListArea,
  MainBodyMovieListSection,
  MainFooter,
  SearchBar,
  Button
} from "./styled-components/Main";
import { Route, Routes } from 'react-router-dom';
import Login from './Member/Login';
import SignUp from './Member/SignUp';
import HomeTest from './HomeTest';

function App() {

  const handleReload = () => {
    window.location.reload();
  };


  return (
    <MainContainer color='black'>
      <MainHeader>
        <MainHeaderLogoArea onClick={handleReload}>TFT</MainHeaderLogoArea>
        <MainHeaderSearchArea>
          <SearchBar></SearchBar> 
        </MainHeaderSearchArea>
        <MainHeaderButtonArea>
          <Button>로그인</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button>게시판</Button>
        </MainHeaderButtonArea>
      </MainHeader>

      <MainBody>
        <MainBodyRollingBannerArea>
        </MainBodyRollingBannerArea>
        <MainBodyMovieListArea>
          <MainBodyMovieListSection></MainBodyMovieListSection>
          <MainBodyMovieListSection></MainBodyMovieListSection>
          <MainBodyMovieListSection></MainBodyMovieListSection>
          <MainBodyMovieListSection></MainBodyMovieListSection>
          <MainBodyMovieListSection></MainBodyMovieListSection>
        </MainBodyMovieListArea>
      </MainBody>
      <MainFooter>
        ⓒ 2024. TFT all rights reserved.
      </MainFooter>

      <Routes>
        <Route path='/' Component={HomeTest} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>


    </MainContainer>

  );
}

export default App;