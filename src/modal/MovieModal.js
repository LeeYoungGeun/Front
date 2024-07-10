import React, { useEffect } from 'react';
import styled, { css } from "styled-components";
import { FaTimes } from 'react-icons/fa';
import MovieTitle from './TitleSection';
import YoutubeIframe from './YoutubeModal';
import useMovieDetails from './useMovieDetails';
import useReviews from './useReviews';
import useTrailer from './useTrailer';
import ReviewSection from './ReveiwSection';
import ContentSection from './ContentSection';
import TitleSection from './TitleSection';

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
  background-color: #141414;
  border-radius: 20px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  cursor: auto;
  ${scrollbarStyle}

  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 95%;
    height: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;  
  cursor: pointer;
  transition: color 0.3s;
  padding: 10px;
  z-index: 10;

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
  overflow-y: hidden;
  max-height: 100%;
`;

const MovieModal = ({ movie, onClose }) => {
  const { isLoading, cast, director, genres, runtime, productionCompanies, error } = useMovieDetails(movie.id);
  const { rating, setRating, review, setReview, reviews, handleSubmitReview } = useReviews();
  const { showTrailer, setShowTrailer, trailerId } = useTrailer(movie.id);

  useEffect(() => {
    // 모달이 열릴 때 body의 스크롤을 막습니다.
    document.body.style.overflow = 'hidden';
    
    // 컴포넌트가 언마운트될 때 (모달이 닫힐 때) body의 스크롤을 다시 활성화합니다.
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!movie) return null;

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

              <TitleSection title={movie.title} />

              <ContentSection 
                movie={movie}
                director={director}
                runtime={runtime}
                genres={genres}
                cast={cast}
                productionCompanies={productionCompanies}
                trailerId={trailerId}
                setShowTrailer={setShowTrailer}
              />

              <ReviewSection 
                reviews={reviews}
                rating={rating}
                setRating={setRating}
                review={review}
                setReview={setReview}
                handleSubmitReview={handleSubmitReview}
              />
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