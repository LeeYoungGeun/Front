import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
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
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setToTal] = useState(0);
  const [allStarts, setAllStarts] = useState(0);
  const [user, setUser] = useState('');
  
  const fetchReviews = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      let option_review_listOfReviewPaginated = {
        method: 'post',
        url: 'http://localhost:8090/api/review/listOfReviewPaginated',
        headers: headers_val,
        data : JSON.stringify({
          "movie_id": movie_id,
          "page": page,
          "size": 6
        })
      };

      axios.request(option_review_listOfReviewPaginated)
      .then((response) => {
        const newReviews = response.data.dtoList.map(review => ({
          review_id: review.review_id,
          text: review.review_text,
          rating: review.review_star,
          user : review.mid
        }));

        setToTal(() => [response.data.total]);
        setAllStarts(() => [response.data.allStart]);
        setReviews(prevReviews => [...prevReviews, ...newReviews]);
        
         console.log('Fetched reviews:', newReviews);
        // console.log('Current reviews state:', reviews);

        setPage(prevPage => prevPage + 1);
        //setHasMore(newReviews.length === 6 && reviews.length < total);
        setHasMore(newReviews.length === 6 );
      })
      .catch((error) => {
        console.log(error);
      });
    }catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [movie_id, page, loading, hasMore]);

  useEffect(() => {
    setReviews([]); // 영화가 변경될 때 리뷰 목록 초기화
    setPage(0);
    setHasMore(true);
    fetchReviews();
  }, [movie_id]);

  const handleSubmitReview = () => {    
    
    if (review.trim() !== '') {
      setReviews([...reviews, { text: review, rating, user}]);
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
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return { rating, setRating, review, setReview, reviews, handleSubmitReview,  fetchReviews, loading, hasMore, total, allStarts };
};

export default useReviews;