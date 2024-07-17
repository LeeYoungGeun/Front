import styled, { keyframes } from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { MainBody } from '../Main';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  /* grid-template-columns: repeat(auto-fill, 167px); 보고 아래거로 변경*/
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

const NoPosterImage = styled.img`
  height: 250px;
  width: 167px;
  cursor: pointer;
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${rotate} 1s linear infinite;
  margin: 20px auto;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2em;
  margin-top: 20px;
`;

// 이미지 베이스 URL
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

// TMDB API 키
const API_KEY = 'c74603ff98c5e43ed99e1ed37812c876';

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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const fetchMovies = useCallback(async (newSearch = false) => {
    if (loading || (!hasMore && !newSearch)) return;
    setLoading(true);
    
    const startTime = Date.now();
    
    let url, params;
    if (searchParam) {
      url = 'https://api.themoviedb.org/3/search/movie';
      params = { language: 'ko', include_adult: 'false', query: searchParam, page: newSearch ? 1 : page };
    } else if (genreId) {
      url = 'https://api.themoviedb.org/3/discover/movie';
      params = { language: 'ko', include_adult: 'false', with_genres: genreId, page: newSearch ? 1 : page };
    } else if (keyword) {
      const keywordResponse = await axios.get('https://api.themoviedb.org/3/search/keyword', {
        params: { query: keyword },
        headers: { Authorization: API_KEY }
      });
      const keywordId = keywordResponse.data.results[0]?.id;
      if (keywordId) {
        url = 'https://api.themoviedb.org/3/discover/movie';
        params = { with_keywords: keywordId, page: newSearch ? 1 : page };
      }
    }

    if (url) {
      try {
        const response = await axios.get(url, {
          params,
          headers: { Authorization: API_KEY }
        });
        const newMovies = response.data.results;
        
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 1000) {
          await new Promise(resolve => setTimeout(resolve, 1000 - elapsedTime));
        }

        setResults(prevResults => newSearch ? newMovies : [...prevResults, ...newMovies]);
        setPage(prevPage => newSearch ? 2 : prevPage + 1);
        setHasMore(newMovies.length === 20);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setHasMore(false);
      }
    }

    setLoading(false);
    setIsAtBottom(false);
  }, [searchParam, genreId, keyword, page, loading, hasMore]);

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(true);
  }, [searchParam, genreId, keyword]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (scrolledToBottom) {
        setIsAtBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isAtBottom && !loading && hasMore) {
      fetchMovies(false);
    }
  }, [isAtBottom, loading, hasMore, fetchMovies]);

  const handleGenreClick = useCallback((newGenreId, newGenreName) => {
    setSelectedMovie(null);  // 모달 닫기
    clearSearchValue();
    navigate(`/search?genre=${newGenreId}`, { state: { genreName: newGenreName } });
  }, [clearSearchValue, navigate]);

  const handleKeywordClick = useCallback((keyword) => {
    setSelectedMovie(null);  // 모달 닫기
    clearSearchValue();
    navigate(`/search?keyword=${keyword}`);
  }, [clearSearchValue, navigate]);

  useEffect(() => {
    setSelectedMovie(null);
  }, [searchParam, genreId, keyword]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParam, genreId, keyword]);

  // useEffect(() => { 문제없으면 삭제
  //   if (searchParam && searchParam.trim()) { // Ensure searchParam is not null or empty
  //     console.log("Fetching results for:", searchParam);

  //     // 영화 검색
  //     const fetchSearchResults = async () => {
  //       const searchOptions = {
  //         method: 'GET',
  //         url: `https://api.themoviedb.org/3/search/movie`,
  //         params: { api_key: API_KEY, language: 'ko', include_adult: 'false', query: searchParam },
  //       };

  //       try {
  //         const response = await axios.request(searchOptions);
  //         console.log('API Response:', response); // 응답 데이터 출력
  //         setResults(response.data.results);
  //       } catch (error) {
  //         console.error('API 요청 실패:', error); // 오류 메시지 출력
  //       }
  //     };

  //     fetchSearchResults();
  //   } else {
  //     console.log("searchParam is null or empty.");
  //   }
  // }, [searchParam]);

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
          {results.map((movie, index) => (
            <SearchResultListImgLi key={`${movie.id}-${index}`} onClick={() => setSelectedMovie(movie)}>
              {movie.poster_path ? (
                <SearchResultListImg 
                  src={`${baseImageUrl}${movie.poster_path}`}
                  alt={movie.title || `Search Results Movie ${index + 1}`}
                />
              ) : (
                <NoPosterImage src='img/NoPosterImage.jpg' alt="NoPosterImage" />
              )}
            </SearchResultListImgLi>
          ))}
        </SearchResultListArea>
        {loading && (
          <>
            <LoadingSpinner />
            <LoadingMessage>추가 결과를 로딩 중입니다...</LoadingMessage>
          </>
        )}
        {!loading && !hasMore && results.length > 0 && <p>모든 결과를 불러왔습니다.</p>}
        {!loading && results.length === 0 && <p>검색 결과가 없습니다.</p>}
      </SearchResultListAreaStyle>
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)}
          onGenreClick={handleGenreClick}
          onKeywordClick={handleKeywordClick}
          clearSearchValue={clearSearchValue}
        />
    )}
    </MainBody>
  );
}

export default SearchResultList;
