import {useEffect, useState} from "react";
import './App.css';
import Test from "./Test";
import SignUp from "./Member/SignUp";
import Login from "./Member/Login";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    background-image: url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg');
  background-size: cover;
  background-position: center;
  }
`

function App() {

 return(
    <div>
    <GlobalStyle/>
    <Login/>
    </div>
 )
}

export default App;
