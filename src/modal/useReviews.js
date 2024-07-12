import axios from 'axios';
import { useState } from 'react';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

export const getCookie = () => {
  return cookies.get("accessToken");
 }

const useReviews = (movie_id,movie_title) => {
  //별점
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  
  const handleSubmitReview = () => {    
    
    if (review.trim() !== '') {
      setReviews([...reviews, { text: review, rating }]);
      setReview('');
      setRating(0);
      
      let option = {
        method: 'post',
        url: 'http://localhost:8090/movie/register',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${getCookie()}`
        },
        data : JSON.stringify({
          "movie_id": movie_id,
          "movie_title": movie_title
        })
      };

      axios.request(option)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    }

  };

  return { rating, setRating, review, setReview, reviews, handleSubmitReview };
};

export default useReviews;