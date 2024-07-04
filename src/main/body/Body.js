import {
  MainBody,
  MainBodyRollingBannerArea,
  MainBodyMovieListArea,
  MainBodyMovieListSection
} from '../Main';

function Body() {

    return (
      <MainBody>
        <MainBodyRollingBannerArea/>
        <MainBodyMovieListArea>
          <MainBodyMovieListSection></MainBodyMovieListSection>
          <MainBodyMovieListSection></MainBodyMovieListSection>
          <MainBodyMovieListSection></MainBodyMovieListSection>
          <MainBodyMovieListSection></MainBodyMovieListSection>
          <MainBodyMovieListSection></MainBodyMovieListSection>
        </MainBodyMovieListArea>
      </MainBody>
    );
  
  }
  
  export default Body;