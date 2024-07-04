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
  MainFooter
} from "./styled-components/Main";


function App() {
  return (
    <MainContainer color='black'>
      <MainHeader>
        <MainHeaderLogoArea>logo</MainHeaderLogoArea>
        <MainHeaderSearchArea>search</MainHeaderSearchArea>
        <MainHeaderButtonArea>button</MainHeaderButtonArea>
      </MainHeader>

      <MainBody>
        <MainBodyRollingBannerArea>
          banner
        </MainBodyRollingBannerArea>
        <MainBodyMovieListArea>
          <MainBodyMovieListSection>movie list 1</MainBodyMovieListSection>
          <MainBodyMovieListSection>movie list 2</MainBodyMovieListSection>
          <MainBodyMovieListSection>movie list 3</MainBodyMovieListSection>
          <MainBodyMovieListSection>movie list 4</MainBodyMovieListSection>
          <MainBodyMovieListSection>movie list 5</MainBodyMovieListSection>
        </MainBodyMovieListArea>
      </MainBody>
      <MainFooter>
        ⓒ 2024. TFT all rights reserved.
      </MainFooter>
    </MainContainer>
  );
}

export default App;