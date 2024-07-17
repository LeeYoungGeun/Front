import React, { useCallback, useRef } from 'react';
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
  margin-top: 20px;
  max-height: 40%;
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
  max-height: 60%;
  overflow-y: auto;
  ${scrollbarStyle}
`;

const ReviewItem = styled.li`
  margin-bottom: 15px;
`;

const ReviewSection = ({ 
  reviews, 
  rating, 
  setRating, 
  review, 
  setReview, 
  handleSubmitReview,
  fetchReviews,
  loading,
  hasMore,

  total,
  allStars

}) => {

    const handleRating = (value) => setRating(value);
    const handleReviewChange = (e) => setReview(e.target.value);

    const observer = useRef();
    const lastReviewElementRef = useCallback(node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchReviews();
        }
      });
      if (node) observer.current.observe(node);
    }, [loading, hasMore, fetchReviews]);


    console.log('Rendering reviews:', reviews);

    console.log("allStars" + allStars);
    console.log("total" + total);


    return (
      <StyledReviewSection>
        <ReviewHeader>
          <MovieReview>한 줄 리뷰</MovieReview>
          <MovieReviewCount>총 {total}건 | 평점 {total > 0 ? (allStars / total).toFixed(1) : '0'}</MovieReviewCount>
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
            <ReviewItem 
              key={item.id || index} 
              ref={index === reviews.length - 1 ? lastReviewElementRef : null}
            >
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < item.rating ? "#ffc107" : "#e4e5e9"} />
              ))}
              <div>작성자 : {item.user}</div>
              {' '}{item.text}
            </ReviewItem>
          ))}
          {loading && <ReviewItem>Loading...</ReviewItem>}
        </ReviewList>
      </StyledReviewSection>
    );
};

export default ReviewSection;
