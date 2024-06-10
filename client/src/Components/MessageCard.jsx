import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'
const MessageCard = ({ partner }) => {
    const { setSelectedMsg } = useContext(UserContext);
    return (
        <Container onClick={() => setSelectedMsg(partner)}>
            <Image src={partner.avatar.url} alt="profile" />
            <TextContainer>
                <Name>{partner.name}</Name>
                <Username>@{partner.username}</Username>
            </TextContainer>

        </Container>
    )
}

export default MessageCard

const Container = styled.div`
    display: flex;
    
    color :white;
    padding : 10px;
    &:hover{
        background-color: #1A1A1A;
    }
   
`
const Image = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    align-self: center;
`
const Name = styled.h1`
    color: white;
    font-size: 20px;
    margin: 0;
`
const Username = styled.p`
    color: gray;
    font-size: 15px;
    margin-top: 5px;
`
