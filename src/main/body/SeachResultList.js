import styled from "styled-components";
import { useEffect, useState } from "react";
import { MainBody } from '../Main';
import { useSearchParams } from "react-router-dom";
import MovieModal from "../../modal/MovieModal";
import axios from "axios";

// 스타일 정의
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
  grid-template-columns: repeat(8, 1fr); /* 필요에 따라 열 조정 */
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

// 이미지 베이스 URL
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

// TMDB API 키
const API_KEY = 'c74603ff98c5e43ed99e1ed37812c876';

function SearchResultList() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('searchParam');
  console.log("searchParam:", searchParam);

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchParam && searchParam.trim()) { // Ensure searchParam is not null or empty
      console.log("Fetching results for:", searchParam);

      // 영화 검색
      const fetchSearchResults = async () => {
        const searchOptions = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/search/movie`,
          params: { api_key: API_KEY, language: 'ko', include_adult: 'false', query: searchParam },
        };

        try {
          const response = await axios.request(searchOptions);
          console.log('API Response:', response); // 응답 데이터 출력
          setResults(response.data.results);
        } catch (error) {
          console.error('API 요청 실패:', error); // 오류 메시지 출력
        }
      };

      fetchSearchResults();
    } else {
      console.log("searchParam is null or empty.");
    }
  }, [searchParam]);

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
        </SearchResultListArea>
      </SearchResultListAreaStyle>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </MainBody>
  );
}

export default SearchResultList;
