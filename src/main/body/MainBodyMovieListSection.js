import styled from "styled-components";
import axios from "axios";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
//test img
//import MovieListImage1 from '../img/movieImg.jpg';

//style
const MainBodyMovieListSectionStyle = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const SectionTitle = styled.h1`
  margin-left: 3em;
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

//영화 목록 종류 
//인기영화 20
const moviePopularOptions = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/popular',
  params: {language: 'en-US', page: '1'},
  headers: {
    accept: 'application/json'
  }
};

function MainBodyMovieListSection(){

  let [row1, setRow1] = useState();

  useEffect(() => {
    //인기영화 20
    axios
    .request(moviePopularOptions)
    .then(function (response) {
      setRow1(response.data.results);
      // console.log('api req : ');
      // console.log(response.data.results[0].id);
      // console.log(response.data.results[0].title);
      // console.log(response.data.results[0].poster_path);
    })
    .catch(function (error) {
      console.error(error);
    });
  },[])

  // console.log("row : " + row);

  return(
      <MainBodyMovieListSectionStyle>
          <SectionTitle>인기영화 20</SectionTitle>
          <MovieListSwiper
              slidesPerView="auto"
              spaceBetween={20}
              freeMode={true}
              modules={[FreeMode]}
          > 

          {Array.isArray(row1) && row1.length > 0
          ? row1.map((movie, index) => (
              <MovieListSwiperSlide key={index}>
                <SectionImg src={baseImageUrl + movie.poster_path} alt={`Top 10 Movie ${index + 1}`} />
              </MovieListSwiperSlide>
            ))
          : null}
             
          </MovieListSwiper>
      </MainBodyMovieListSectionStyle>
  );
}

export{ MainBodyMovieListSection };
