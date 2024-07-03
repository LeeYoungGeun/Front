import React from "react";
import { Link, Outlet } from "react-router-dom";


function HomeTest(){


return(
    <div>
        {/* <ul> */}
            {/*
            Link 태그를 이용해서 다른 페이지로 이동.
            to 속성을 이용하여 연결할 주소를 적는다.
            어느 컴포넌트든 사용이 가능함.
            ** Routes 사이에있는 경로를 이동할 때 사용함.
            */}
            {/* <li><Link to="/">홈</Link></li>
            <li><Link to="/user">회원페이지(Link)</Link></li>
            <li><Link to="/info">회원정보페이지(Link)</Link></li>
            <li><a href="/user">회원페이지(a태그)</a></li>

            <li><Link to="/user?id=aaa111&key=1">회원페이지(쿼리 param 처리)</Link></li>
            </ul>
        <hr /> */}

         <ul>
            <li>
                <Link to='/info/1'>1번 info</Link>
                <Link to='/info/2'>2번 info</Link>
                <Link to='/info/3'>3번 info</Link>
            </li>
         </ul>
         <hr />
         <ul>
            <li>
                <Link to='/user/testuser'>testuser1</Link>
                <Link to='/user/testuser2'>testuser2</Link>
                <Link to='/user/testuser3'>testuser3</Link>
            </li>
            <li>
                <Link to='/mypage'>마이페이지로 이동.</Link>
            </li>
            <li>
                <Link to='/mypage?login=true'>마이페이지 ㄱ</Link>
            </li>
         </ul>
        <h2>홈 페이지</h2>
        <p>지금 보여지는 곳은 홈페이지 임. 사이트 대문임.</p>

        <Outlet />

    </div>
);
}

export default HomeTest;