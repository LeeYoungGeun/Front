import React from "react";

function KakaoLogin(){
    
    const client_id = process.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_uri = process.REACT_APP_KAKAO_REDIRECT_URI;

    const url = `https://kauth.kakao.com/oauth/authorize?scope=account_email&client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`;

    const loginKakao = () => {
        window.location.href = url;
    }
    return <SNSLink img="./img/login/kako.png" onClick={loginKakao} />
}