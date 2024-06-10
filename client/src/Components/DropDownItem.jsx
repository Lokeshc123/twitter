import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext';
const DropDownItem = ({ user }) => {
    const { selectedUser, setSelectedUser } = useContext(UserContext);

    return (
        <Container style={{ padding: 10 }} onClick={() => setSelectedUser(user)}>
            <Image src={user.avatar.url} alt="profile" />
            <TextContainer>
                <Name>{user.name}</Name>
                <Username>@{user.username}</Username>
            </TextContainer>
        </Container>
    )
}

export default DropDownItem

const Container = styled.div`
    display: flex;
    
    /* width: 100%; */
   border-radius: 12px;
    color: white;
    &:hover {
        background-color: #1A1A1A;
    }
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin: 5px;
`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`
const Name = styled.h1`
    color: white;
    font-size: 20px;
    margin-top: 0;
`
const Username = styled.p`
    color: gray;
    font-size: 15px;
    margin-top: 2px;
`