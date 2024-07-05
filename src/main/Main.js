import styled from "styled-components";
import { FaSearch } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay , FreeMode } from 'swiper/modules';
import "swiper/css";
import "swiper/css/free-mode";
import MovieListImage1 from '../img/movieImg.jpg';
import mainBodyRollingBanne1 from '../img/mainBodyRollingBanne1.jpg';
import mainBodyRollingBanne2 from '../img/mainBodyRollingBanne2.jpg';

// container
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${props => props.color || 'black'};
  color: white;
  overflow: hidden;
  padding-top: 2vh;
`;

// header
const MainHeader = styled.div`
  display: flex;
  width: 100%;
  height: 8vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  z-index: 1001; 
`;

const MainHeaderLogoArea = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: hotpink;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
`;

const MainHeaderSearchArea = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: relative;
  left: -35px;
  color: white;
  cursor: pointer;
`;

const SearchBar = () => {
  return (
      <>
        <SearchInput type="text" placeholder="검색어를 입력해 주세요." />
        <SearchIcon />
      </>
  );
};

const MainHeaderButtonArea = styled.div`
  width: 20%;
  display: flex;
  margin-left: 50px;
  align-items: center;
`;

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  
  &:hover {
    background-color: transparent;
    color: hotpink;
    border-color: white;
  }

  &:focus {
    outline: none;
  }
`;

// body
const MainBody = styled.div`
  flex: 1;
  padding-top: 8vh; // margin-top 대신 padding-top 사용
  overflow-y: auto;
  font-family: bold;
`;

const MainBodyRollingBannerAreaStlye = styled.div`
  height: 60vh; // 뷰포트 높이의 100%
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RollingImgArea = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideImage = styled.img`
 display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function MainBodyRollingBannerArea(){
    return(
        <MainBodyRollingBannerAreaStlye>
            <RollingImgArea>
                <StyledSwiper
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={false}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >    
                  <StyledSwiperSlide>
                    <SlideImage src={mainBodyRollingBanne1} alt="Banner 1"/>
                  </StyledSwiperSlide>
                  <StyledSwiperSlide>
                    <SlideImage src={mainBodyRollingBanne2} alt="Banner 2"/>
                  </StyledSwiperSlide>
                </StyledSwiper>
            </RollingImgArea>
        </MainBodyRollingBannerAreaStlye>
    );
}

const MainBodyMovieListArea = styled.div`
  width: 100%;
`;

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
  margin-left: 1.5em;
  height: 220px;
  width: auto;
`;

function MainBodyMovieListSection(){
  return(
      <MainBodyMovieListSectionStyle>
          <SectionTitle>오늘의 Top 10</SectionTitle>
          <MovieListSwiper
              slidesPerView="auto"
              spaceBetween={20}
              freeMode={true}
              modules={[FreeMode]}
          >
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 1"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 2"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 3"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 4"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 5"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 6"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 7"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 8"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 9"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 10"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 11"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 12"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 13"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 14"/></MovieListSwiperSlide>
              <MovieListSwiperSlide><SectionImg src={MovieListImage1} alt="Movie 15"/></MovieListSwiperSlide>
          </MovieListSwiper>
      </MainBodyMovieListSectionStyle>
  );
}

// -SearchResultList

const SearchResultListAreaStyle = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const SearchResultListArea = styled.ul`
/*   display: flex;
  margin-left: 50px;
  align-items: center; */

  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Adjust columns as needed */
  gap: 10px; 
`;

const SearchResultListImgLi = styled.li`
  /* margin-left: 1.5em; */


  background-color: lightblue;
  text-align: center;
  line-height: 50px;
  margin: 5px;
`;

const SearchResultListImg = styled.img`
  height: 300px;
  width: auto;
`;

function SearchResultListBody(){
  return(
    <SearchResultListAreaStyle>
          <SectionTitle># 검색 결과</SectionTitle>
          <SearchResultListArea>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
             <SearchResultListImgLi>
                <SearchResultListImg src={MovieListImage1} alt="Movie 1"/>
             </SearchResultListImgLi>
           

          </SearchResultListArea>
    </SearchResultListAreaStyle>
  );
}

//footer
const MainFooter = styled.div`
  height: 18vh;
  width: 100%;
  margin-left: 2em;
  display: flex;
  align-items: center;
  font-size: 1.2em;
`;

export {
  MainContainer, MainHeader, MainBody, MainFooter,
  MainHeaderLogoArea, MainHeaderSearchArea, SearchBar, MainHeaderButtonArea,  Button,
  MainBodyMovieListSection,
  MainBodyRollingBannerArea, MainBodyMovieListArea,
  SearchResultListBody
};