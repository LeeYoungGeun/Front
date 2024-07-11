import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainContainer } from './main/Main';
import Header from './main/header/Header';
import Body from './main/body/Body';
import SearchResultList from './main/body/SeachResultList';
import Footer from './main/footer/Footer';
import Login from './Member/Login';
import SignUp from './Member/SignUp';
import Mypage from './Member/Mypage'
import Modify from './Member/Modify';
import CheckPw from './Member/CheckPw';







function App() {

  return (
    <MainContainer color='black'>
      <Header/>
      <Routes>
        <Route path='/' element={<Body />} /> 
        <Route path='/search' element={<SearchResultList />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/modify' element={<Modify />} />
        <Route path='/modifycheck' element={<Modify />} />
        <Route path='/modifypw' element={<Modify />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/checkpw' element={<CheckPw />} />

      </Routes>
      <Footer/>
    </MainContainer>
  );
}

export default App;