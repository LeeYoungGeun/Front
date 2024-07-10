import styled from "styled-components";
import axios from "axios";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import MovieModal from "../../modal/MovieModal";

//test img
//import MovieListImage1 from '../img/movieImg.jpg';

//style
const MainBodyMovieListSectionStyle = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const SectionTitle = styled.h1`
  margin-left: 3em;
  margin-top: 1em;
  margin-bottom: 15px;
  height: 60px;
  display: flex;
  align-items: center;
`;

const MovieListSwiper = styled(Swiper)`
  width: 90%;
  cursor: pointer;
  .swiper-slide {
    width: auto;
    height: auto;
  }
  .swiper-scrollbar {
    display: none;
  }
`;

const MovieListSwiperSlide = styled(SwiperSlide)`
  width: auto !important;
`;

const SectionImg = styled.img`
  height: 250px;
  width: auto;
`;

//api base url 
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

// api test img
// const insideImg = '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg';
// https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg

//영화 목록 종류 

//Access Token Auth
const accessToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzQ2MDNmZjk4YzVlNDNlZDk5ZTFlZDM3ODEyYzg3NiIsIm5iZiI6MTcyMDQ4NjEwNi43NjM2ODUsInN1YiI6IjY2ODc1ZTgxZTA3ZGZmNWJmYTVlNGZjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Oqqj10jPDW6KLHtEgXBsQU15QlGkah0nwkBxI-9A6xE";

//현재 상영작 20
const nowPlayingOptions = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/now_playing',
  params: {language: 'ko', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: accessToken
  }
};

//개봉 예정작 20 
const upcomingOptions = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/upcoming',
  params: {language: 'ko', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: accessToken
  }
};

//인기영화 20
const moviePopularOptions = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/popular',
  params: {language: 'ko', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: accessToken
  }
};

//최고평점 20
const topRatedOptions = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/top_rated',
  params: {language: 'ko', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: accessToken
  }
};


function MainBodyMovieListSection(){
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  //현재 상영작 20
  let [row1, setRow1] = useState();
  //개봉 예정작 20
  let [row2, setRow2] = useState();
  //인기영화 20
  let [row3, setRow3] = useState();
  //최고 평점 20
  let [row4, setRow4] = useState();

  useEffect(() => {
    //현재 상영작 20
    axios 
    .request(nowPlayingOptions)
    .then(function(response){
      setRow1(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
     //개봉 예정작 20
     axios 
     .request(upcomingOptions)
     .then(function(response){
       setRow2(response.data.results);
     })
     .catch(function (error) {
       console.log(error);
     });
     //인기영화 20
     axios 
     .request(moviePopularOptions)
     .then(function(response){
       setRow3(response.data.results);
       //console.log('api req : ');
       //console.log(response.data.results[0].id);
       //console.log(response.data.results[0].title);
       //console.log(response.data.results[0].poster_path);
     })
     .catch(function (error) {
       console.log(error);
     });
    //최고평점 20
    axios 
    .request(topRatedOptions)
    .then(function(response){
      setRow4(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  // console.log("row : " + row);

  return(
      <MainBodyMovieListSectionStyle>
          <SectionTitle>현재 상영작 20</SectionTitle>
          <MovieListSwiper
              slidesPerView="auto"
              spaceBetween={20}
              freeMode={true}
              modules={[FreeMode]}
          > 
          {Array.isArray(row1) && row1.length > 0
          ? row1.map((movie, index) => (
              <MovieListSwiperSlide key={index} onClick={() => setSelectedMovie(movie)}>
                <SectionImg src={baseImageUrl + movie.poster_path} alt={`Now Playing 20 Movie ${index + 1}`} />
              </MovieListSwiperSlide>
            ))
          : null}

          {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}

          </MovieListSwiper>

          <SectionTitle>개봉 예정작 20</SectionTitle>
          <MovieListSwiper
              slidesPerView="auto"
              spaceBetween={20}
              freeMode={true}
              modules={[FreeMode]}
          > 
          {Array.isArray(row2) && row2.length > 0
          ? row2.map((movie, index) => (
              <MovieListSwiperSlide key={index} onClick={() => setSelectedMovie(movie)}>
                <SectionImg src={baseImageUrl + movie.poster_path} alt={`Upcomming 20 Movie ${index + 1}`} />
              </MovieListSwiperSlide>
            ))
          : null}

          {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}


          </MovieListSwiper>
          
          <SectionTitle>인기영화 20</SectionTitle>
          <MovieListSwiper
              slidesPerView="auto"
              spaceBetween={20}
              freeMode={true}
              modules={[FreeMode]}
          > 
          {Array.isArray(row3) && row3.length > 0
          ? row3.map((movie, index) => (
              <MovieListSwiperSlide key={index} onClick={() => setSelectedMovie(movie)}>
                <SectionImg src={baseImageUrl + movie.poster_path} alt={`Popular Movie 20  ${index + 1}`} />
              </MovieListSwiperSlide>
            ))
          : null}

          {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}

          </MovieListSwiper>

          <SectionTitle>최고평점 20</SectionTitle>
          <MovieListSwiper
              slidesPerView="auto"
              spaceBetween={20}
              freeMode={true}
              modules={[FreeMode]}
          > 
          {Array.isArray(row4) && row4.length > 0
          ? row4.map((movie, index) => (
              <MovieListSwiperSlide key={index} onClick={() => setSelectedMovie(movie)}>
                <SectionImg src={baseImageUrl + movie.poster_path} alt={`Top Rated 20 Movie ${index + 1}`} />
              </MovieListSwiperSlide>
            ))
          : null}

          {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}

          </MovieListSwiper>
      </MainBodyMovieListSectionStyle>
      
  );
}

export{ MainBodyMovieListSection };
