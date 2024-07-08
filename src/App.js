import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainContainer } from './main/Main';
import Header from './main/header/Header';
import Body from './main/body/Body';
import SearchResultList from './main/body/SeachResultList';
import Footer from './main/footer/Footer';
import Login from './Member/Login';
import SignUp from './Member/SignUp';
import axios from 'axios';


const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/popular',
  params: {language: 'en-US', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzQ2MDNmZjk4YzVlNDNlZDk5ZTFlZDM3ODEyYzg3NiIsIm5iZiI6MTcyMDE0ODM3MS41NTIzMjQsInN1YiI6IjY2ODc1ZTgxZTA3ZGZmNWJmYTVlNGZjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xoMmIjVFGUr237r38nczNizX1908x08ZQM5QwUSKCl4'
  }
};

// const imagesoptions = {
//   method: 'GET',
//   url: 'https://http://image.tmdb.org/t/p/',  ///images?language=en-US&include_image_language=en,null
//   // params: {language: 'en-US', page: '1'},
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzQ2MDNmZjk4YzVlNDNlZDk5ZTFlZDM3ODEyYzg3NiIsIm5iZiI6MTcyMDE0ODM3MS41NTIzMjQsInN1YiI6IjY2ODc1ZTgxZTA3ZGZmNWJmYTVlNGZjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xoMmIjVFGUr237r38nczNizX1908x08ZQM5QwUSKCl4'
//   }
// };

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

// let poster_path ='/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg';
// axios.get('https://image.tmdb.org/t/p/'+'w500'+poster_path)
// .then(result  => console.log(result));


function App() {



  return (
    <MainContainer color='black'>
      <Header/>
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