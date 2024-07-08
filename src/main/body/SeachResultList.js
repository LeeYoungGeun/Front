import styled from "styled-components";
import {MainBody} from '../Main';
import MovieListImage1 from '../../img/movieImg.jpg';
  
// -SearchResultList

const SearchResultListAreaStyle = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const SectionTitle = styled.h1`
  margin-left: 3em;
  margin-bottom: 15px;
  height: 60px;
  display: flex;
  align-items: center;
`;

const SearchResultListArea = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* Adjust columns as needed */
  margin-left: 3em;
`;

const SearchResultListImgLi = styled.li`
  text-align: center;
  margin: 5px;
`;

const SearchResultListImg = styled.img`
  height: 250px;
`;

  function SearchResultList() {
      return (
        <MainBody>
            <SearchResultListAreaStyle>
              <SectionTitle># 검색 결과</SectionTitle>
              <SearchResultListArea>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
                <SearchResultListImgLi>
                    <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
                </SearchResultListImgLi>
              </SearchResultListArea>
          </SearchResultListAreaStyle>
        </MainBody>
      );
    
    }
    
    export default SearchResultList;