import { useState } from 'react';

const useReviews = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleSubmitReview = () => {
    if (review.trim() !== '') {
      setReviews([...reviews, { text: review, rating }]);
      setReview('');
      setRating(0);
    }
  };

  return { rating, setRating, review, setReview, reviews, handleSubmitReview };
};

export default useReviews;