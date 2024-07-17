import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import {MainBody} from '../Main';
import { useSearchParams } from "react-router-dom";
import MovieModal from "../../modal/MovieModal";
import {Cookies} from 'react-cookie';
//import MovieListImage1 from '../../img/movieImg.jpg';

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
  cursor: pointer;
`;

//api base url 
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

const cookies = new Cookies();

const getCookie = () => { 
  console.log(cookies.get("accessToken"));
  return cookies.get("accessToken");
 }

 const accessToken = `Bearer ${getCookie()}`;

// test
// const searchParam = "마스크";

  function SearchResultList() {

        const [selectedMovie, setSelectedMovie] = useState(null);

        let [searchParamVal] = useSearchParams();
        let searchParam = searchParamVal.get('searchParam');
        console.log("searchParam : " + searchParam);

        const searchOptions = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {language: 'ko', include_adult: 'false', query : searchParam},
            headers: {
              accept: 'application/json',
              Authorization: accessToken
            }
          };

        let [results, setResults] = useState();

        useEffect(() => {
            //영화 검색 
            axios 
            .request(searchOptions)
            .then(function(response){
                setResults(response.data.results);
                // console.log('api req : ');
                // console.log(response.data.results[0].id);
                // console.log(response.data.results[0].title);
                // console.log(response.data.results[0].poster_path);
            })
            .catch(function (error) {
            console.log(error);
        });
      },[results])

      console.log("results : " + results);

      return (
        <MainBody>
            <SearchResultListAreaStyle>
              <SectionTitle># 검색 결과</SectionTitle>
              <SearchResultListArea>
                {Array.isArray(results) && results.length > 0
                ? results.map((movie, index) => (
                    <SearchResultListImgLi key={index} onClick={() => setSelectedMovie(movie)}>
                        <SearchResultListImg src={baseImageUrl + movie.poster_path} alt={`Search Results Movie ${index + 1}`} />
                    </SearchResultListImgLi>
                    ))
                : <h2 style={{'fontSize' : '1.5em'}}>결과없음</h2>}    
                {/* test <SearchResultListImg src={MovieListImage1} alt="Movie 1"/> */}
              </SearchResultListArea>
          </SearchResultListAreaStyle>
          {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </MainBody>
      );
    
    }
    
    export default SearchResultList;