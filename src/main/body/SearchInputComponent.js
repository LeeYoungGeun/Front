import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchIcon = styled(FaSearch)`
  position: relative;
  left: -35px;
  color: white;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

function SearchInputComponent(){

    const [inputValue, setSearchInputValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearchInputValue(event.target.value);
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            navigate(`/search?searchParam=${inputValue}`);
            setSearchInputValue('');
        }
    }

    const handleSearchClick = () => {
        if(inputValue !== ''){
            navigate(`/search?searchParam=${inputValue}`);
            setSearchInputValue('');
        }else{
            alert("검색어를 입력하세요.")
        }
    };

    return(
        <>
            <SearchInput
                type="text"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <SearchIcon onClick={handleSearchClick} />
        </>
    );

}

export default SearchInputComponent;