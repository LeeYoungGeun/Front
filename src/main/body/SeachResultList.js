// import styled from "styled-components";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import {MainBody} from '../Main';
// import { useSearchParams } from "react-router-dom";
// import MovieModal from "../../modal/MovieModal";
// //import MovieListImage1 from '../../img/movieImg.jpg';
// const SearchResultListAreaStyle = styled.div`
//   width: 100%;
//   margin-top: 40px;
// `;
// const SectionTitle = styled.h1`
//   margin-left: 3em;
//   margin-bottom: 15px;
//   height: 60px;
//   display: flex;
//   align-items: center;
// `;
// const SearchResultListArea = styled.ul`
//   display: grid;
//   grid-template-columns: repeat(8, 1fr); /* Adjust columns as needed */
//   margin-left: 3em;
// `;
// const SearchResultListImgLi = styled.li`
//   text-align: center;
//   margin: 5px;
// `;
// const SearchResultListImg = styled.img`
//   height: 250px;
//   cursor: pointer;
// `;
// //api base url 
// const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
// const accessToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzQ2MDNmZjk4YzVlNDNlZDk5ZTFlZDM3ODEyYzg3NiIsIm5iZiI6MTcyMDQ4NjEwNi43NjM2ODUsInN1YiI6IjY2ODc1ZTgxZTA3ZGZmNWJmYTVlNGZjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Oqqj10jPDW6KLHtEgXBsQU15QlGkah0nwkBxI-9A6xE";
// // test
// // const searchParam = "마스크";
//   function SearchResultList() {
//         const [selectedMovie, setSelectedMovie] = useState(null);
//         let [searchParamVal] = useSearchParams();
//         let searchParam = searchParamVal.get('searchParam');
//         console.log("searchParam : " + searchParam);
//         const searchOptions = {
//             method: 'GET',
//             url: 'https://api.themoviedb.org/3/search/movie',
//             params: {language: 'ko', include_adult: 'false', query : searchParam},
//             headers: {
//               accept: 'application/json',
//               Authorization: accessToken
//             }
//           };
//         let [results, setResults] = useState();
//         useEffect(() => {
//             //영화 검색 
//             axios 
//             .request(searchOptions)
//             .then(function(response){
//                 setResults(response.data.results);
//                 // console.log('api req : ');
//                 // console.log(response.data.results[0].id);
//                 // console.log(response.data.results[0].title);
//                 // console.log(response.data.results[0].poster_path);
//             })
//             .catch(function (error) {
//             console.log(error);
//         });
//       },[results])
//       console.log("results : " + results);
//       return (
//         <MainBody>
//             <SearchResultListAreaStyle>
//               <SectionTitle># 검색 결과</SectionTitle>
//               <SearchResultListArea>
//                 {Array.isArray(results) && results.length > 0
//                 ? results.map((movie, index) => (
//                     <SearchResultListImgLi key={index} onClick={() => setSelectedMovie(movie)}>
//                         <SearchResultListImg src={baseImageUrl + movie.poster_path} alt={`Search Results Movie ${index + 1}`} />
//                     </SearchResultListImgLi>
//                     ))
//                 : <h2 style={{'fontSize' : '1.5em'}}>결과없음</h2>}    
//                 {/* test <SearchResultListImg src={MovieListImage1} alt="Movie 1"/> */}
//               </SearchResultListArea>
//           </SearchResultListAreaStyle>
//           {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
//         </MainBody>
//       );
    
//     }
    
//     export default SearchResultList;
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { MainBody } from '../Main';
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import MovieModal from "../../modal/MovieModal";
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
  grid-template-columns: repeat(auto-fill, 167px);
  gap: 10px;
  justify-content: center;
  margin-left: 3em;
  margin-right: 3em;
`;

const SearchResultListImgLi = styled.li`
  text-align: center;
  margin: 5px;
  width: 167px;
  height: 250px;
`;

const SearchResultListImg = styled.img`
  height: 250px;
  width: 167px;
  cursor: pointer;
`;

const NoPosterAvailable = styled.div`
  height: 250px;
  width: 167px;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
const accessToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzQ2MDNmZjk4YzVlNDNlZDk5ZTFlZDM3ODEyYzg3NiIsIm5iZiI6MTcyMDQ4NjEwNi43NjM2ODUsInN1YiI6IjY2ODc1ZTgxZTA3ZGZmNWJmYTVlNGZjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Oqqj10jPDW6KLHtEgXBsQU15QlGkah0nwkBxI-9A6xE";

function SearchResultList({ clearSearchValue }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParam = searchParams.get('searchParam');
  const genreId = searchParams.get('genre');
  const genreName = location.state?.genreName;
  const [results, setResults] = useState([]);
  const keyword = searchParams.get('keyword');

  
  useEffect(() => {
    setSelectedMovie(null);
    if (searchParam) {
      const searchOptions = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: { language: 'ko', include_adult: 'false', query: searchParam },
        headers: {
          accept: 'application/json',
          Authorization: accessToken
        }
      };
      axios.request(searchOptions)
        .then(function (response) {
          setResults(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (genreId) {
      const genreSearchOptions = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: { language: 'ko', include_adult: 'false', with_genres: genreId },
        headers: {
          accept: 'application/json',
          Authorization: accessToken
        }
      };
      axios.request(genreSearchOptions)
        .then(function (response) {
          setResults(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [searchParam, genreId]);

  const handleGenreClick = (newGenreId, newGenreName) => {
    setSelectedMovie(null);
    clearSearchValue();
    navigate(`/search?genre=${newGenreId}`, { state: { genreName: newGenreName } });
  };

  useEffect(() => {
    if (keyword) {
      const keywordSearchOptions = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/keyword',
        params: { query: keyword },
        headers: {
          accept: 'application/json',
          Authorization: accessToken
        }
      };
  
      axios.request(keywordSearchOptions)
        .then(response => {
          const keywordId = response.data.results[0]?.id;
          if (keywordId) {
            return axios.get('https://api.themoviedb.org/3/discover/movie', {
              params: { with_keywords: keywordId },
              headers: {
                Authorization: accessToken
              }
            });
          }
        })
        .then(response => {
          if (response) {
            setResults(response.data.results);
          }
        })
        .catch(error => {
          console.error("Error searching by keyword:", error);
        });
    }
  }, [keyword]);

  return (
    <MainBody>
      <SearchResultListAreaStyle>
        <SectionTitle>
          {searchParam 
            ? `타이틀 #${searchParam} 로 검색하신 결과입니다.` 
            : genreName 
            ? `장르 #${genreName} 로 검색하신 결과입니다.`
            : keyword
            ? `키워드 #${keyword} 로 검색하신 결과입니다.`
            : '검색 결과'}
        </SectionTitle>
        <SearchResultListArea>
          {Array.isArray(results) && results.length > 0
            ? results.map((movie, index) => (
              <SearchResultListImgLi key={index} onClick={() => setSelectedMovie(movie)}>
                {movie.poster_path ? (
                  <SearchResultListImg 
                    src={`${baseImageUrl}${movie.poster_path}`}
                    alt={movie.title || `Search Results Movie ${index + 1}`}
                  />
                ) : (
                  <NoPosterAvailable>
                    <div>No</div>
                    <div>Poster</div>
                    <div>Available</div>
                  </NoPosterAvailable>
                )}
              </SearchResultListImgLi>
            ))
          : <h2 style={{ 'fontSize': '1.5em' }}>결과없음</h2>}
        </SearchResultListArea>
      </SearchResultListAreaStyle>
      {selectedMovie && (
        <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)}
        onGenreClick={handleGenreClick} 
        />
      )}
    </MainBody>
  );
}
export default SearchResultList;