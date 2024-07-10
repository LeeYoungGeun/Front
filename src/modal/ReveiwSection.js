import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled, { css } from 'styled-components';

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

const StyledReviewSection = styled.div`
    margin-bottom: 10px;
  height: 30%;
  width: auto;
  ${scrollbarStyle}
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



const ReviewSection = ({ 
  reviews, 
  rating, 
  setRating, 
  review, 
  setReview, 
  handleSubmitReview 
  
}) => {

    const handleRating = (value) => setRating(value);
    const handleReviewChange = (e) => setReview(e.target.value);

  return (
    <StyledReviewSection>
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
    </StyledReviewSection>
  );
};

export default ReviewSection;