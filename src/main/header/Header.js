import { Link } from 'react-router-dom';
import {
    MainHeader, 
    MainHeaderLogoArea, MainHeaderSearchArea, MainHeaderButtonArea,
    SearchBar, Button
  } from '../Main';

function Header() {

  return (
    <MainHeader>
       <MainHeaderLogoArea><Link to="/">TFT</Link></MainHeaderLogoArea>
        <MainHeaderSearchArea>
        <SearchBar></SearchBar> 
        </MainHeaderSearchArea>
        <MainHeaderButtonArea>
        <Link to="/login"><Button>로그인</Button></Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/signup"><Button>게시판</Button></Link>
        </MainHeaderButtonArea>
    </MainHeader>
  );

}

export default Header;