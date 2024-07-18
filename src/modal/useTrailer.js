import { useState, useEffect } from 'react';

const useTrailer = (movieId) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerId, setTrailerId] = useState('');

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const apiKey = 'c74603ff98c5e43ed99e1ed37812c876';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch trailer');
        }

        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer');
        setTrailerId(trailer ? trailer.key : '');
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return { showTrailer, setShowTrailer, trailerId };
};

export default useTrailer;