import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaPlay, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

const Wrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 20px 20px;
  ${scrollbarStyle}
`;

const MovieDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
  margin-bottom: 18px;
`;

const MovieDetailsColumn = styled.div`
  font-size: 15px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 5px 10px;
  align-items: start;
`;

const MovieDetailsLabel = styled.span`
  font-weight: bold;
  white-space: nowrap;
`;

const MovieDetailsContent = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CompanyList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyItem = styled.span`
  &:not(:first-child) {
    padding-left: 0;
    margin-left: 0;
  }
`;

const GenreList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const GenreItem = styled.li`
  background-color: black;
  color: red;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  
  /* 3D 효과 적용 */
  box-shadow: 0 0 0 1px #000000 inset,
              0 0 0 2px rgba(255,255,255,0.15) inset,
              0 8px 0 0 rgba(0, 0, 0, .7),
              0 8px 0 1px rgba(255,0,0,.4),
              0 8px 8px 1px rgba(0,0,0,0.5);
  transition: all 0.1s ease;
  
  &:active {
    box-shadow: 0 0 0 1px #000000 inset,
                0 0 0 2px rgba(255,255,255,0.15) inset,
                0 0 0 1px rgba(255,0,0,0.4);
    transform: translateY(8px);
  }
`;

const MovieDescriptionContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const MovieDescriptionContent = styled.p`
  margin-bottom: 10px;
  padding: 10px 0;
  font-size: 16px;
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
  ${scrollbarStyle}
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
  margin-top: 10px;
`;

const ContentSection = ({ 
  movie, 
  director, 
  runtime, 
  genres, 
  cast, 
  productionCompanies, 
  trailerId, 
  setShowTrailer, 
  onGenreClick
}) => {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const navigate = useNavigate();

  const truncateOverview = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength);
  };

  const handleGenreClick = (genreId, genreName) => {
    navigate(`/search?genre=${genreId}`, { state: { genreName } });
  };

  return (
    <Wrapper>
      <MovieDetailsContainer>
        <MovieDetailsColumn>
            <MovieDetailsLabel>개봉일:</MovieDetailsLabel>
            <MovieDetailsContent>{movie.release_date}</MovieDetailsContent>
            <MovieDetailsLabel>평점:</MovieDetailsLabel>
            <MovieDetailsContent>{Number(movie.vote_average).toFixed(1)}</MovieDetailsContent>
            <MovieDetailsLabel>러닝타임:</MovieDetailsLabel>
            <MovieDetailsContent>{runtime}분</MovieDetailsContent>
        </MovieDetailsColumn>
        <MovieDetailsColumn>
            <MovieDetailsLabel>감독:</MovieDetailsLabel>
            <MovieDetailsContent>{director}</MovieDetailsContent>
            <MovieDetailsLabel>제작사:</MovieDetailsLabel>
            <CompanyList>
            {productionCompanies.slice(0, 2).map((company, index) => (
                <CompanyItem key={company.id}>
                {index === 0 ? company.name + ',' : company.name}
                </CompanyItem>
            ))}
            </CompanyList>
        </MovieDetailsColumn>
      </MovieDetailsContainer>

      <GenreList>
        {genres && genres.map(genre => (
          <GenreItem 
            key={genre.id} 
            onClick={() => handleGenreClick(genre.id, genre.name)}
          >
            {genre.name}
          </GenreItem>
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
        {(cast.slice(0, 7)).map(actor => (
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
    </Wrapper>
  );
};

export default ContentSection;