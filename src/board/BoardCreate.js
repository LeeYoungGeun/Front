import React, { useState, useEffect } from "react";
import api, { setAuthToken } from '../Member/api';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function BoardCreate() {
    // const [boardData, setBoardData] = useState([]);
    // const {size,total,start,end,prev,next,dtoList } = boardData;

    // console.log("HarryPotter");
    const [cookies] = useCookies(['accessToken']);
    const [memberData, setMemberData] = useState();
    
    const [createBoard, setCreateBoard] = useState({
        title: "",
        content: "",
        writer: ""
    });
    // const {writer} = createBoard;

    const handleCreateBoardChange = (e) => {
        console.log("handleCreateBoardChange: ", e.target);
        setCreateBoard({ ...createBoard, [e.target.name]: e.target.value });
      };

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        // const { title, content, writer } = createBoard;
        if(!createBoard.title || !createBoard.content || !createBoard.writer) {
            alert("제목, 내용, 작성자를 입력해주세요.");  
            return;
        }else {
            const response = await api.post('/board/register', createBoard);
            console.log("HarryPotter",response);
        }
        
        
    };
    
//로그인한 유저 정보를 가져오는 부분
    useEffect(() => {
        // if (storedMemberData) {
        //   setMemberData(JSON.parse(storedMemberData));
        // } else {
            setAuthToken(cookies.accessToken);
            api.get("/api/auth/modify")
            .then(response => {
                const {mnick} = response.data;
                //   const data = {mnick};
                setMemberData(mnick);
                setCreateBoard({...createBoard, writer: mnick});
                console.log("mnick: ", mnick);
                console.log("response.data: ", response.data);
                //  writer = mnick;
            })
            .catch(error => console.error(error));
        // }
    }, []);


    return (
        <div className="board-read">
        <div className="board-content">
          <div className="board-header">
            <span className="board-category">자유게시판</span>
            <form className="board-header" onSubmit={handleCreateBoard}>
                <div>
                    <span className="author" name='writer'
                        style={{position: "absolute", right: "0", marginRight: "100px"}}>작성자 : {memberData}</span>
                </div>
                {/* <span className="author">작성자 : {createBoard.writer}</span> */}
                {/* <div className="board-info">
                    <input className="author" name='writer' value={createBoard.writer} onChange={handleCreateBoardChange} placeholder="작성자" />
                    </div> */}
                {/* <h1 className="board-title">{createBoard.title}</h1> */}
            <input className="board-title" name='title' value={createBoard.title} onChange={handleCreateBoardChange} placeholder="제목" />      
                <div className="board-body">
                    {/* <p>{createBoard.content}</p> */}
                    <textarea className="author" name="content" value={createBoard.content} onChange={handleCreateBoardChange} placeholder="내용" />
                </div>
                <button type="submit" onClick={handleCreateBoard}><Link to={`/board/1`}>완료</Link></button>
            </form>
            {/* <button className="board-button" onClick={handleCreateBoard}>등록</button> */}
          </div>
        </div>
        </div>
      );

}

export default BoardCreate;