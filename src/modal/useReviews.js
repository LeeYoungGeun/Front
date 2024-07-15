import axios from 'axios';
import { useEffect, useState } from 'react';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

export const getCookie = () => {
  return cookies.get("accessToken");
 }

const headers_val = {
  'Content-Type': 'application/json', 
  'Authorization': `Bearer ${getCookie()}`
}

const useReviews = (movie_id,movie_title) => {
  //별점
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  
  let option_review_list = {
    method: 'post',
    url: 'http://localhost:8090/api/review/listOfReview',
    headers: headers_val,
    // movie_id, user_id , review_text, review_star
    data : JSON.stringify({
      "movie_id": movie_id
    })
  };

  useEffect(() => {
    axios.request(option_review_list)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  },[]);

  const handleSubmitReview = () => {    
    
    if (review.trim() !== '') {
      setReviews([...reviews, { text: review, rating }]);
      setReview('');
      setRating(0);
      
      let option_movie_register = {
        method: 'post',
        url: 'http://localhost:8090/api/movie/register',
        headers: headers_val,
        data : JSON.stringify({
          "movie_id": movie_id,
          "movie_title": movie_title
        })
      };

      let option_review_register = {
        method: 'post',
        url: 'http://localhost:8090/api/review/register',
        headers: headers_val,
        // movie_id, user_id , review_text, review_star
        data : JSON.stringify({
          "movie_id": movie_id,
          "review_text": review,
          "review_star": rating
        })
      };

      axios.request(option_movie_register)
      .then((response) => {
        //해당 영화 id가 db id와 일치하면
        if (response.data.result === movie_id) { 
          //댓글 등록 api 호출
          return axios.request(option_review_register)
        }else{
        //일치 하지않으면
          alert("영화 정보가 일치하지 않습니다.")
          return false;
        }
      })
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