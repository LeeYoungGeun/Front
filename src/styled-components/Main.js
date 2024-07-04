import React from "react";
import styled from "styled-components";
import MovieListImage1 from '../img/movieImg.jpg';
import mainBodyRollingBanne1 from '../img/mainBodyRollingBanne1.jpg';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${props => props.color || 'black'};
  color: white;

  outline: 1px solid red;
`;

// header
const MainHeader = styled.div`
  display: flex;
  width: 100%;
  height: 8vh;
  position: fixed;
  top: 0;
  left: 0;
  
  background-color: black;

  outline: 1px solid red;
`;

const MainHeaderLogoArea = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  outline: 1px solid red;
`;

const MainHeaderSearchArea = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;

  outline: 1px solid red;
`;

const MainHeaderButtonArea = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  outline: 1px solid red;
`;

// body
const MainBody = styled.div`
  flex: 1;
  margin-top: 8vh;
  overflow-y: auto;
  
  font-family: bold;

  outline: 1px solid red;
`;

const MainBodyRollingBannerAreaStlye = styled.div`
  height: 800px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: 1px solid red;
`;

const RollingImgArea = styled.div`
  
  /* display: flex;
  align-items: center;
  justify-content: center; */
  outline: 1px solid red;

`;

const RollingImg = styled.img`

  height: 800px;

`;

function MainBodyRollingBannerArea(){
    return(
        <MainBodyRollingBannerAreaStlye>
            <RollingImgArea>
                <RollingImg src={mainBodyRollingBanne1}></RollingImg>
            </RollingImgArea>
        </MainBodyRollingBannerAreaStlye>
    );
}

const MainBodyMovieListArea = styled.div`
  width: 100%;

  outline: 1px solid red;
`;

const MainBodyMovieListSectionStyle = styled.div`

  width: 100%;

  outline: 1px solid red;

  /* flex-direction: column; */
`;

const SectionTitle = styled.h1`
  margin-left: 3em;
  height: 60px;

  display: flex;
  align-items: center;

  outline: 1px solid red;

`;

const SectionImgArea = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px solid red;

`;

const SectionImg = styled.img`
  margin-left: 1.5em;
  height: 220px;

`;

function MainBodyMovieListSection(){
    return(
        <MainBodyMovieListSectionStyle>
            <SectionTitle>오늘의 Top 10</SectionTitle>
            <SectionImgArea>
                <SectionImg src={MovieListImage1}></SectionImg>
                <SectionImg src={MovieListImage1}></SectionImg>
                <SectionImg src={MovieListImage1}></SectionImg>
                <SectionImg src={MovieListImage1}></SectionImg>
                <SectionImg src={MovieListImage1}></SectionImg>
                <SectionImg src={MovieListImage1}></SectionImg>
                <SectionImg src={MovieListImage1}></SectionImg>
                <SectionImg src={MovieListImage1}></SectionImg>
            </SectionImgArea>
        </MainBodyMovieListSectionStyle>
    );
}


//footer
const MainFooter = styled.div`
  height: 18vh;
  width: 100%;

  margin-left: 2em;

  display: flex;
  align-items: center;
  
`;

export {
  MainContainer, MainHeader, MainBody, MainFooter,
  MainHeaderLogoArea, MainHeaderSearchArea, MainHeaderButtonArea,
  MainBodyRollingBannerArea, MainBodyMovieListArea,
  MainBodyMovieListSection
};