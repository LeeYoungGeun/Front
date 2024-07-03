import './App.css';
import { createGlobalStyle } from "styled-components";
import { Link, Route,Routes, useLocation } from "react-router-dom";
import HomeTest from './HomeTest';
import SignUp from './Member/SignUp';
import Login from './Member/Login';
const GlobalStyle = createGlobalStyle`
  body {
    background-image: url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg');
  background-size: cover;
  background-position: center;
  }
`


function App() {

 return(
    <>
      <GlobalStyle/> 
      
      <Routes>
        <Route path='/' Component={HomeTest} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
 )
}

export default App;
