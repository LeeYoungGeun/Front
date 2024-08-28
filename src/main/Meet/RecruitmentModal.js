import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

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
  z-index: 1003;
`;

const ModalContent = styled.div`
  position: relative;
  width: 70%;
  max-width: 500px;
  background-color: #141414;
  border-radius: 20px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    margin-bottom: 5px;
  }

  input, textarea {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #333;
    background-color: #222;
    color: white;
  }

  textarea {
    min-height: 100px;
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
`;

const RecruitmentModal = ({ onClose, onSubmit }) => {

  
  const [formData, setFormData] = useState({
    meetTitle: '',
    meetContent: '',
    personnel: 1,
    meetTime: '',
    movieTitle: '', // Add this field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'personnel' ? parseInt(value) : value
    }));
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (image) {
      formDataToSend.append('image', image);
    }
    onSubmit(formDataToSend);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <h2>모임 모집하기</h2>
        <form onSubmit={handleSubmit}>
        <InputGroup>
          <label htmlFor="image">영화 포스터 (선택사항)</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </InputGroup>
          <InputGroup>
            <label htmlFor="meetTitle">모임 제목</label>
            <input
              type="text"
              id="meetTitle"
              name="meetTitle"
              value={formData.meetTitle}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="meetContent">모임 내용</label>
            <textarea
              id="meetContent"
              name="meetContent"
              value={formData.meetContent}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="personnel">모집 인원</label>
            <input
              type="number"
              id="personnel"
              name="personnel"
              value={formData.personnel}
              onChange={handleChange}
              min="1"
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="meetTime">모임 시간</label>
            <input
              type="datetime-local"
              id="meetTime"
              name="meetTime"
              value={formData.meetTime}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <Button type="submit">모집 등록</Button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RecruitmentModal;