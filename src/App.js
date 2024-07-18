import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainContainer } from './main/Main';
import Header from './main/header/Header';
import Body from './main/body/Body';
import SearchResultList from './main/body/SeachResultList';
import Footer from './main/footer/Footer';
import Login from './Member/Login';
import SignUp from './Member/SignUp';
import Mypage from './Member/Mypage';
import { Modify} from './Member/Modify'; 
import Remove from './Member/Remove';
import { useCookies } from 'react-cookie';
import { setAuthToken } from './Member/api';
import Board from './board/Board';
import BoardRead from './board/BoardRead';
import BoardCreate from './board/BoardCreate';
import BoardUpdate from './board/BoardUpdate';

import NotFound from './error/NotFound';


function App() {
  const [cookies, setCookie] = useCookies(['accessToken']);

  useEffect(() => {
    //토큰값 가져옴.
    const accessToken = cookies.accessToken;

    //토큰값이 있는 지 확인. -> api.js에서 처리.
    if (accessToken) {
      setAuthToken(accessToken);
    }
  }, [cookies]);
  return (
    <MainContainer color='black'>
      <Header/>
      <Routes>
        <Route path='/' element={<Body />} /> 
        <Route path='/search' element={<SearchResultList />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/modify' element={<Modify />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/board' element={<Board />}>
          <Route path=':page' element={<Board />} />
        </Route>
        <Route path='/boardread/:paramBno' element={<BoardRead />} />
        <Route path='/boardcreate' element={<BoardCreate />}></Route>
        <Route path='/boardupdate/:paramBno' element={<BoardUpdate />}></Route>
        <Route path='/checkpw' element={<Remove />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
      <Footer/>
    </MainContainer>
  );
}

export default App;
