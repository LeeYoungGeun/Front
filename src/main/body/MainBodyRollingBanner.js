import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/free-mode";
import mainBodyRollingBanne1 from '../../img/mainBodyRollingBanne1.jpg';
import mainBodyRollingBanne2 from '../../img/mainBodyRollingBanne2.jpg';

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

function MainBodyRollingBanner(){
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

export {MainBodyRollingBanner};