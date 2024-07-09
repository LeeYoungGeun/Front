import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import {MainBody} from '../Main';
//import MovieListImage1 from '../../img/movieImg.jpg';

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

//api base url 
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

const searchParam = "마스크";

const searchOptions = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: {language: 'ko', include_adult: 'false', query : searchParam},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzQ2MDNmZjk4YzVlNDNlZDk5ZTFlZDM3ODEyYzg3NiIsIm5iZiI6MTcyMDQxODM2Mi42MDI5NzUsInN1YiI6IjY2ODc1ZTgxZTA3ZGZmNWJmYTVlNGZjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J5Xq5UC7-KvJ4rCa02rOKrlSmo9M-23Fc_gEqC6wrJY'
    }
  };

  function SearchResultList() {

        let [results, setResults] = useState();

        useEffect(() => {
            //영화 검색 
            axios 
            .request(searchOptions)
            .then(function(response){
                setResults(response.data.results);
                console.log('api req : ');
                console.log(response.data.results[0].id);
                console.log(response.data.results[0].title);
                console.log(response.data.results[0].poster_path);
            })
            .catch(function (error) {
            console.log(error);
        });
      },[])

      console.log("results : " + results);

      return (
        <MainBody>
            <SearchResultListAreaStyle>
              <SectionTitle># 검색 결과</SectionTitle>
              <SearchResultListArea>
                {Array.isArray(results) && results.length > 0
                ? results.map((movie, index) => (
                    <SearchResultListImgLi key={index}>
                        <SearchResultListImg src={baseImageUrl + movie.poster_path} alt={`Search Results Movie ${index + 1}`} />
                    </SearchResultListImgLi>
                    ))
                : null}    

                {/* test <SearchResultListImg src={MovieListImage1} alt="Movie 1"/> */}
              </SearchResultListArea>
          </SearchResultListAreaStyle>
        </MainBody>
      );
    
    }
    
    export default SearchResultList;