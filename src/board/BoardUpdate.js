import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../Member/api';

function BoardUpdate() {
    const [boardData, setBoardData] = useState({ title: '', content: '', writer: '' });
    const { bno } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.boardData) {
            setBoardData(location.state.boardData);
        } else {
            const fetchBoardData = async () => {
                try {
                    const response = await api.get(`/board/read/${bno}`);
                    setBoardData(response.data);
                } catch (error) {
                    console.error("Error fetching board data:", error.response || error);
                }
            };
            fetchBoardData();
        }
    }, [bno, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/board/${bno}`, boardData);
            navigate(`/board/read/${bno}`);
        } catch (error) {
            console.error("Error updating board data:", error.response || error);
        }
    };

    return (
        <div>
            <h2>게시글 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input type="text" name="title" value={boardData.title} onChange={handleChange} />
                </div>
                <div>
                    <label>내용</label>
                    <textarea name="content" value={boardData.content} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>작성자</label>
                    <input type="text" name="writer" value={boardData.writer} onChange={handleChange} />
                </div>
                <button type="submit">수정 완료</button>
            </form>
        </div>
    );
}

export default BoardUpdate;