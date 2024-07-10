import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const YoutubeModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const YoutubeContainer = styled.div`
  position: relative;
  width: 80%;
  max-width: 800px;
`;

const CloseYoutubeButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
`;

const YoutubeIframe = ({ videoId, onClose }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const enterFullscreen = () => {
      if (iframeRef.current) {
        if (iframeRef.current.requestFullscreen) {
          iframeRef.current.requestFullscreen();
        } else if (iframeRef.current.mozRequestFullScreen) { // Firefox
          iframeRef.current.mozRequestFullScreen();
        } else if (iframeRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
          iframeRef.current.webkitRequestFullscreen();
        } else if (iframeRef.current.msRequestFullscreen) { // IE/Edge
          iframeRef.current.msRequestFullscreen();
        }
      }
    };

    // 영상이 로드된 후 약간의 지연 시간을 두고 전체 화면으로 전환
    const timer = setTimeout(enterFullscreen, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <YoutubeModal onClick={onClose}>
      <YoutubeContainer onClick={(e) => e.stopPropagation()}>
        <CloseYoutubeButton onClick={onClose}>✖</CloseYoutubeButton>
        <iframe 
          ref={iframeRef}
          width="100%" 
          height="450" 
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </YoutubeContainer>
    </YoutubeModal>
  );
};

export default YoutubeIframe;