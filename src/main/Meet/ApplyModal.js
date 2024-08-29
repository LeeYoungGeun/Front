import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import api from './api';
import UpdateMeet from './UpdateMeet';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1004;
`;

const ModalContent = styled.div`
  position: relative;
  width: 80%;
  max-width: 600px;
  background-color: #141414;
  border-radius: 20px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const MeetingDetails = styled.div`
  margin-bottom: 20px;
`;

const CommentSection = styled.div`
  margin-top: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CommentInput = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #222;
  color: white;
  margin-bottom: 10px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  align-self: flex-end;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background-color: #222;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ApplyModal = ({ meeting, onClose, isLoggedIn }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // 초기값을 빈 배열로 설정
  const [isAuthor, setIsAuthor] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchComments();
    checkIsAuthor();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/api/meet/${meeting.meetId}/comments`);
      setComments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]); // 에러 발생 시 빈 배열로 설정
    }
  };

  const checkIsAuthor = async () => {
    try {
      const response = await api.get(`/api/meet/${meeting.meetId}/isAuthor`);
      setIsAuthor(response.data.isAuthor);
    } catch (error) {
      console.error('Error checking author status:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    try {
      await api.post(`/api/meet/${meeting.meetId}/comments`, { content: comment });
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  const handleUpdateComplete = async (updatedMeeting) => {
    try {
      await api.put(`/api/meet/${meeting.meetId}`, updatedMeeting);
      setShowUpdateModal(false);
      // 업데이트된 정보로 현재 모달 내용 갱신
      fetchMeetingDetails();
    } catch (error) {
      console.error('Error updating meeting:', error);
      alert('모임 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 모임을 삭제하시겠습니까?')) {
      try {
        await api.delete(`/api/meet/${meeting.meetId}`);
        onClose();
      } catch (error) {
        console.error('Error deleting meeting:', error);
      }
    }
  };

  const fetchMeetingDetails = async () => {
    try {
      const response = await api.get(`/api/meet/${meeting.meetId}`);
      // Update the meeting details in the parent component or state
      // This might require lifting the state up or using a state management library
    } catch (error) {
      console.error('Error fetching meeting details:', error);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <MeetingDetails>
          <h2>{meeting.meetTitle}</h2>
          <p>모집 영화: {meeting.movieTitle}</p>
          <p>모임 내용: {meeting.meetContent}</p>
          <p>모집 인원: {meeting.personnel}</p>
          <p>모임 시간: {new Date(meeting.meetTime).toLocaleString()}</p>
          {meeting.image && <img src={meeting.image} alt="Movie poster" />}
        </MeetingDetails>
        
        {isAuthor && (
          <div>
            <Button onClick={handleUpdate}>수정하기</Button>
            <Button onClick={handleDelete}>삭제하기</Button>
          </div>
        )}

        <CommentSection>
          <h3>댓글</h3>
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
            />
            <Button type="submit">댓글 등록</Button>
          </CommentForm>
          <CommentList>
            {Array.isArray(comments) && comments.length > 0 ? (
              comments.map((comment, index) => (
                <CommentItem key={index}>
                  <p>{comment.content}</p>
                  <small>{new Date(comment.createdAt).toLocaleString()}</small>
                </CommentItem>
              ))
            ) : (
              <p>댓글이 없습니다.</p>
            )}
          </CommentList>
        </CommentSection>

        {showUpdateModal && (
          <UpdateMeet
            meeting={meeting}
            onClose={() => setShowUpdateModal(false)}
            onUpdate={handleUpdateComplete}
          />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ApplyModal;