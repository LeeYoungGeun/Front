import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaSearch } from 'react-icons/fa';
import api, { setAuthToken } from './api';
import { useCookies } from 'react-cookie';
import MeetCreate from './MeetCreate';
import MeetApply from './MeetApply';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  background-color: #141414;
  border-radius: 20px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #2b2b2b;
  border-radius: 30px;
  padding: 10px 20px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
`;

const MeetingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #2b2b2b;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MeetItem = styled.div`
  background-color: #2b2b2b;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;  // 높이를 늘려 이미지를 수용할 공간 확보
`;

const MeetImage = styled.div`
  width: 100%;
  height: 150px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const MeetInfo = styled.div`
  flex-grow: 1;
`;

const MeetModal = ({ onClose }) => {
  const [cookies] = useCookies(['accessToken']);
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMeetCreate, setShowMeetCreate] = useState(false);
  const [showMeetApply, setShowMeetApply] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    checkLoginStatus();
    fetchMeetings();
  }, [cookies.accessToken, currentPage]);

  const checkLoginStatus = async () => {
    if (cookies.accessToken) {
      setAuthToken(cookies.accessToken);
      try {
        const response = await api.get("/api/auth/modify");
        setIsLoggedIn(true);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const fetchMeetings = async () => {
    try {
      const token = cookies.accessToken;
      if (token) {
        setAuthToken(token);
      }

      const response = await api.get('/api/meet/list', {
        params: { page: currentPage, size: 9 }
      });

      if (response.data && response.data.dtoList) {
        const meetingsWithImages = response.data.dtoList.map(meeting => ({
          ...meeting,
          imageUrl: meeting.fileNames && meeting.fileNames.length > 0
            ? `/view/s_${meeting.fileNames[0]}`  // 썸네일 이미지 경로
            : `/view/${process.env.PUBLIC_URL}/default-image.jpg`  // 프로젝트의 public 폴더에 있는 기본 이미지
        }));
        setMeetings(meetingsWithImages);
        setTotalPages(response.data.totalPage);
      } else {
        console.error('Unexpected data structure:', response.data);
        setMeetings([]);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
      setMeetings([]);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null; // 무한 루프 방지
    e.target.style.backgroundImage = `url("${process.env.PUBLIC_URL}/default-image.jpg")`;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMeetCreateClick = () => {
    if (isLoggedIn) {
      setShowMeetCreate(true);
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };

  const handleMeetCreateClose = (dataChanged = false) => {
    setShowMeetCreate(false);
    if (dataChanged) {
      fetchMeetings();
    }
  };

  const handleMeetApplyClick = (meeting) => {
    if (isLoggedIn) {
      setSelectedMeeting(meeting);
      setShowMeetApply(true);
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };

  const filteredMeetings = meetings.filter(meeting =>
    meeting.meetTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <CloseButton onClick={onClose}><FaTimes /></CloseButton>
          
          <SearchBar>
            <SearchInput 
              type="text" 
              placeholder="검색" 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FaSearch style={{ marginRight: '10px', color: '#888' }} />
            <Button onClick={handleMeetCreateClick}>모집하기</Button>
          </SearchBar>

          <MeetingsGrid>
            {filteredMeetings.map(meeting => (
              <MeetItem key={meeting.meetId}>
                <MeetImage 
                  src={meeting.imageUrl} 
                  onError={(e) => {
                    e.target.style.backgroundImage = `url("${process.env.PUBLIC_URL}/default-image.jpg")`;
                  }}
                />
                <MeetInfo>
                  <h3>{meeting.meetTitle}</h3>
                  <p>모집인원: {meeting.personnel}</p>
                  <p>모임시간: {new Date(meeting.meetTime).toLocaleString()}</p>
                </MeetInfo>
                <Button onClick={() => handleMeetApplyClick(meeting)}>신청하기</Button>
              </MeetItem>
            ))}
          </MeetingsGrid>

          <Pagination>
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              이전
            </PageButton>
            <span>{currentPage} / {totalPages}</span>
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              다음
            </PageButton>
          </Pagination>
        </ModalContent>
      </ModalOverlay>

      {showMeetCreate && (
        <MeetCreate 
          show={showMeetCreate}
          onClose={handleMeetCreateClose}
          userData={userData}
        />
      )}

      {showMeetApply && selectedMeeting && (
        <MeetApply
          meeting={selectedMeeting}
          onClose={() => setShowMeetApply(false)}
          isLoggedIn={isLoggedIn}
          userData={userData}
        />
      )}
    </>
  );
};

export default MeetModal;