import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainContainer } from './main/Main';
import Header from './main/header/Header';
import Body from './main/body/Body';
import SearchResultList from './main/body/SeachResultList';
import Footer from './main/footer/Footer';
import Login from './Member/Login';
import SignUp from './Member/SignUp';

function App() {

  const [searchValue, setSearchValue] = useState('');

  const clearSearchValue = () => {
    setSearchValue('');
  };

  return (
    <MainContainer color='black'>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} clearSearchValue={clearSearchValue} />
      <Routes>
        <Route path='/' element={<Body />} /> 
        <Route path='/search' element={<SearchResultList />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer/>
    </MainContainer>
  );
}

export default App;