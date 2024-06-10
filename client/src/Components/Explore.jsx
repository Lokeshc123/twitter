import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { getAllUsers } from '../helper/BackendApi/getData';

import { CiSearch } from "react-icons/ci";
import DropDownItem from './DropDownItem';
const Explore = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState([]);
    const searchBarRef = useRef(null);

    useEffect(() => {
        const getUs = async () => {
            try {
                const res = await getAllUsers();
                setUsers(res.users);
            } catch (error) {
                console.log(error);
            }
        };
        getUs();
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredUsers = users
        .filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(0, 5);

    return (
        <Container>
            <SearchBar ref={searchBarRef} onClick={() => setDropdownVisible(true)}>
                <CiSearch color='gray' size={30} style={{ marginLeft: 5 }} />
                <SearchInput
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {dropdownVisible && (
                    <DropdownMenu>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <DropDownItem key={index} user={user} />
                            ))
                        ) : (
                            <DropdownItem>No users found</DropdownItem>
                        )}
                    </DropdownMenu>
                )}
            </SearchBar>
        </Container>
    )
}

const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 52px;
    margin-top: 10px;
    margin-bottom: 5px;
    background-color: #1A1A1A;
    width : 95%;
    align-self:center;
    border-radius: 30px;
    position: relative;
    &:hover {
        border: 2px solid #1DA1F2;
    }
`;

const SearchInput = styled.input`
    height: 40px;
    width: 69%;
    border: none;
    background-color: #1A1A1A;
    margin-left: 10px;
    font-size: 18px;
    padding-left: 10px;
    outline: none;
    color: white;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 55px;
    left: 5;
    background-color: #000000;
    width: 95%;
    box-shadow: 0 4px 8px 0 rgba(173, 216, 230, 0.4), 0 6px 20px 0 rgba(0, 0, 255, 0.3);
    border-radius: 0 0 10px 10px;
    padding: 10px;
    z-index: 1;
    color: white;
`;


export default Explore


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    border: 1px solid gray;
    color : white;
   
`
const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #1A1A1A;
    }
`;