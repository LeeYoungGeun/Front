import styled from "styled-components";
import {MainBody} from '../Main';
import {MainBodyMovieListSection} from './MainBodyMovieListSection';
import {MainBodyRollingBanner} from "./MainBodyRollingBanner";

const MainBodyMovieListArea = styled.div`
  width: 100%;
`;

function Body() {

    return (
      <MainBody>
        <MainBodyRollingBanner/>
        <MainBodyMovieListArea>
          <MainBodyMovieListSection></MainBodyMovieListSection>
        </MainBodyMovieListArea>
      </MainBody>
    );
  
  }
  
  export default Body;