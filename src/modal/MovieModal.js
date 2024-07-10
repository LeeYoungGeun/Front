// src/main/body/MovieModal.js
import React, { useEffect, useState } from 'react';
import styled, { css } from "styled-components";
import { FaChevronDown, FaChevronUp, FaPlay, FaStar, FaTimes } from 'react-icons/fa';
import YoutubeIframe from './YoutubeModal';

const scrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
  ${scrollbarStyle}
`;

const ModalContent = styled.div`
  position: relative;
  width: 70%;
  height: 80%;
  /* max-width: 1650px;
  max-height: 900px; */
  background-color: #141414;
  border-radius: 20px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  cursor: auto;
  ${scrollbarStyle}
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 95%;
    height: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;  // 변경: absolute 위치 지정
  top: 10px;           // 변경: 상단에서 10px
  right: 10px;         // 변경: 우측에서 10px
  background: none;
  border: none;
  color: white;
  font-size: 40px;  
  cursor: pointer;
  transition: color 0.3s;
  padding: 10px;       // 패딩 10px 유지
  z-index: 10;         // 추가: 다른 요소들 위에 표시

  &:hover {
    color: #e50914;
  }
`;

const PosterImage = styled.img`
  width: auto;
  height: auto;
  margin-right: 20px;
  border-radius: 20px;
`;

const MovieInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100%;
  ${scrollbarStyle}
`;

const MovieTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  background-color: #141414;
  padding: 20px 20px 10px 20px;
  z-index: 1;
  font-size: 45px;
  font-weight: 900;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 20px 20px; 
  ${scrollbarStyle}
`;

const MovieDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const MovieDetailsColumn = styled.div`
  flex: 1;
  font-size: 18px;
`;

const CompanyContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CompanyTitle = styled.h4`
  margin-right: 10px;
  white-space: nowrap;
`;

const CompanyList = styled.ul`
  list-style: none;
  padding: 0;
`;

const GenreList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

const GenreItem = styled.li`
  background-color: #e50914;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
`;

const MovieDescriptionContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const MovieDescriptionContent = styled.p`
  margin-bottom: 10px;
  padding: 10px 0;
  font-size: 18px;
`;

const MoreButton = styled.span`
  color: #e50914;
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
   margin-left: 5px;
`;

const TrailerButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  width: fit-content;
`;

const CastList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 5px;
`;

const CastItem = styled.div`
  text-align: center;
  width: 80px;
`;

const CastImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const ReviewSection = styled.div`
  margin-bottom: 10px;
  height: 30%;
  width: auto;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
`;

const MovieReview = styled.h3`
  font-size: 22px;
  color: white;
  margin: 0;
`;

const MovieReviewCount = styled.div`
  font-size: 16px;
  color: white;
`;

const StarRating = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ReviewInputContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;

const ReviewInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  margin-right: 10px;
  border-radius: 5px;
`;

const SubmitReview = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  white-space: nowrap;
`;

const ReviewList = styled.ul`
  margin-top: 20px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1); 
  border-radius: 5px;
  overflow-y: auto;
  height: 75%;
  ${scrollbarStyle}
`;

const ReviewItem = styled.li`
  margin-bottom: 10px;
`;

const MovieModal = ({ movie, onClose }) => {  
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState([]);
  const [runtime, setRuntime] = useState(0);
  const [trailerId, setTrailerId] = useState('');
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [ageRating, setAgeRating] = useState('');
  const [error, setError] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  useEffect(() => {
    // 모달이 열릴 때 body의 스크롤을 막습니다.
    document.body.style.overflow = 'hidden';
    
    // 컴포넌트가 언마운트될 때 (모달이 닫힐 때) body의 스크롤을 다시 활성화합니다.
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  useEffect(() => {
    const fetchAdditionalInfo = async () => {

      // 데이터 fetching 시작 시 로딩 상태를 true로 설정
      setIsLoading(true);
      setError(null); // 새 요청 시작 시 이전 에러를 초기화합니다

      try {
        const apiKey = '1b13edfe5dc42a52c844089c69230c8f'; 
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=credits,videos`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();

        // 출연진 정보 설정 (상위 5명만)
        setCast(data.credits.cast.slice(0, 10));

        // 감독 정보 설정
        const directorInfo = data.credits.crew.find(person => person.job === 'Director');
        setDirector(directorInfo ? directorInfo.name : 'Unknown');

        // 장르 정보 설정
        setGenres(data.genres);

        // 러닝타임 설정
        setRuntime(data.runtime);

        // 예고편 ID 설정 (첫 번째 예고편)
        const trailer = data.videos.results.find(video => video.type === 'Trailer');
        setTrailerId(trailer ? trailer.key : '');

        // 미국 연령 등급
        const usRelease = data.release_dates?.results.find(r => r.iso_3166_1 === 'US');
        setAgeRating(usRelease?.release_dates[0]?.certification || 'N/A');

        // production_companies가 없을 경우를 대비
        setProductionCompanies(data.production_companies || []);

      } catch (error) {
        console.error('Error fetching movie info:', error);
        // 사용자에게 보여줄 에러 메시지를 설정합니다
        setError('영화 정보를 불러오는 데 실패했습니다.');
      } finally {
        // 데이터 fetching이 끝나면(성공하든 실패하든) 로딩 상태를 false로 설정
        setIsLoading(false);
      }
    };

    fetchAdditionalInfo();

  }, [movie.id]);

  const handleRating = (value) => setRating(value);
  const handleReviewChange = (e) => setReview(e.target.value);
  const handleSubmitReview = () => {
    if (review.trim() !== '') {
      setReviews([...reviews, { text: review, rating }]);
      setReview('');
      setRating(0);
    }
  };

  const truncateOverview = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength);
  };

  if (!movie || !trailerId) return null;

  return (
    <ModalOverlay onClick={onClose}>
          <ModalContent onClick={e => e.stopPropagation()}>
          <CloseButton onClick={onClose}><FaTimes /></CloseButton>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (

            <>
              <PosterImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

              <MovieInfo>
              

                <MovieTitle>{movie.title}</MovieTitle>

                
                <ContentWrapper>

                  <MovieDetailsContainer>
                    <MovieDetailsColumn>
                      <p>개봉일: {movie.release_date}</p>
                      <p>평점: {Number(movie.vote_average).toFixed(1)}</p>
                      <p>러닝타임: {runtime}분</p>
                      <p>감독: {director}</p>
                    </MovieDetailsColumn>

                    <MovieDetailsColumn>
                      {productionCompanies.length > 0 && (
                        <CompanyContainer>
                          <CompanyTitle>제작사:</CompanyTitle>
                          <CompanyList>
                            {productionCompanies.slice(0, showAllCompanies ? productionCompanies.length : 3).map(company => (
                              <li key={company.id}>{company.name}</li>
                            ))}
                          </CompanyList>
                          {productionCompanies.length > 3 && (
                            <MoreButton onClick={() => setShowAllCompanies(!showAllCompanies)}>
                              {showAllCompanies ? '접기' : '더보기'}
                            </MoreButton>
                          )}
                        </CompanyContainer>
                      )}
                    </MovieDetailsColumn>
                  </MovieDetailsContainer>


                  <GenreList>
                    {genres && genres.map(genre => (
                      <GenreItem key={genre.id}>{genre.name}</GenreItem>
                    ))}
                  </GenreList>

                  <MovieDescriptionContainer>
                    <MovieDescriptionContent>
                      {showFullOverview ? movie.overview : truncateOverview(movie.overview, 400)}
                      {movie.overview.length > 400 && (
                        <MoreButton onClick={() => setShowFullOverview(!showFullOverview)}>
                          {showFullOverview ? '접기' : '더보기'}
                        </MoreButton>
                      )}
                    </MovieDescriptionContent>
                  </MovieDescriptionContainer>
                    

                    {trailerId && (
                    <TrailerButton onClick={() => setShowTrailer(true)}>
                      <FaPlay style={{ marginRight: '10px' }} /> 예고편 보기
                    </TrailerButton>
                    )}

                    <CastList>
                      {(cast.slice(0, 10)).map(actor => (
                        <CastItem key={actor.id}>
                          <CastImage 
                            src={actor.profile_path 
                              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                              : 'path_to_default_image.jpg'} 
                            alt={actor.name} 
                          />
                          <p>{actor.name}</p>
                        </CastItem>
                      ))}
                    </CastList>
                  

                  <ReviewSection>
                    <ReviewHeader>
                      <MovieReview>한 줄 리뷰</MovieReview>
                      <MovieReviewCount>총 {reviews.length}건 | 평점 {reviews.length > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) : '0'}</MovieReviewCount>
                    </ReviewHeader>  

                    <StarRating>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          color={index < rating ? "#ffc107" : "#e4e5e9"}
                          onClick={() => handleRating(index + 1)}
                          style={{ cursor: 'pointer' }}
                        />
                      ))}
                    </StarRating>

                    <ReviewInputContainer>
                      <ReviewInput 
                        type="text" 
                        placeholder="리뷰를 작성해주세요" 
                        value={review}
                        onChange={handleReviewChange}
                      />

                      <SubmitReview onClick={handleSubmitReview}>댓글</SubmitReview>
                    </ReviewInputContainer>

                    <ReviewList>
                      {reviews.map((item, index) => (
                        <ReviewItem key={index}>
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} color={i < item.rating ? "#ffc107" : "#e4e5e9"} />
                          ))}
                          {' '}{item.text}
                        </ReviewItem>
                      ))}
                    </ReviewList>

                  </ReviewSection>  
                </ContentWrapper>
              </MovieInfo>
            </>

          )}
          </ModalContent>
          {showTrailer && trailerId && (
        <YoutubeIframe videoId={trailerId} onClose={() => setShowTrailer(false)} />
      )}
        </ModalOverlay>
      );
    };


export default MovieModal;