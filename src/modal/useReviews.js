import { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import api from '../Member/api';

const cookies = new Cookies();

const getCookie = () => {
  console.log(cookies.get("accessToken"));
  return cookies.get("accessToken");
}

const useReviews = (movie_id, movie_title) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [allStars, setAllStars] = useState(0);
  const [user] = '';
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);  // Reset error state before new request
    try {
      const requestData = {
        "movie_id": movie_id,
        "page": page,
        "size": 6
      };
      console.log('Request data:', requestData);

      const response = await api.post('/api/review/listOfReviewPaginated', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie()}`
        }
      });

      console.log('Server response:', response);
      const newReviews = (response.data.dtoList || []).map(review => ({
        review_id: review.review_id,
        text: review.review_text,
        rating: review.review_star,
        user: review.mid
      }));

      setTotal(response.data.total || 0);
      setAllStars(response.data.allStars || 0);
      setReviews(prevReviews => [...prevReviews, ...newReviews]);

      console.log('Fetched reviews:', newReviews);
      console.log('setAllStars', allStars);

      setPage(prevPage => prevPage + 1);
      setHasMore(newReviews.length === 6);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      console.error('Error response:', error.response);  // Log the full error response
      setError('Error fetching reviews. Please try again later.');
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

  const handleSubmitReview = async () => {
    if (review.trim() !== '') {
      setReviews([...reviews, { text: review, rating, user }]);
      setReview('');
      setRating(0);

      try {
        const movieResponse = await api.post('/api/movie/register', {
          "movie_id": movie_id,
          "movie_title": movie_title
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie()}`
          }
        });

        if (movieResponse.data.result === movie_id) {
          await api.post('/api/review/register', {
            "movie_id": movie_id,
            "review_text": review,
            "review_star": rating
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getCookie()}`
            }
          });
        } else {
          alert("영화 정보가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        setError('Error submitting review. Please try again later.');
      }
    }
  };

  return { rating, setRating, review, setReview, reviews, handleSubmitReview, fetchReviews, loading, hasMore, total, allStars, error };
};

export default useReviews;
