import React from 'react'
import styled from 'styled-components'
import { acceptFollowRequest, rejectFollowRequest } from '../helper/BackendApi/sendData';
import { set } from 'mongoose';

const FollowCard = ({ req, setFollowRequests }) => {

    const acceptRequest = async () => {
        try {
            const res = await acceptFollowRequest(req._id);
            console.log(res);
            setFollowRequests((prev) => prev.filter((request) => request._id !== req._id));
        }
        catch (error) {
            console.log(error);
        }
    };
    const rejectRequest = async () => {
        try {
            const res = await rejectFollowRequest(req._id);
            setFollowRequests((prev) => prev.filter((request) => request._id !== req._id));
            console.log(res);

        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <Container>
            <DetailContainer>
                <Image src={req.avatar.url} alt="profile" />
                <TextContainer>
                    <Name>{req.name}</Name>
                    <Username>@{req.username}</Username>
                </TextContainer>
            </DetailContainer>
            <ButtonContainer>
                <AcceptButton onClick={acceptRequest}>Accept</AcceptButton>
                <RejectButton onClick={rejectRequest}>Reject</RejectButton>
            </ButtonContainer>
        </Container>
    )
}

export default FollowCard

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    
    border-radius: 10px;
   
    color: white;
    margin: 10px 0;
    
    
    &:hover {
        
        background-color: #2c3e50;
    }
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`

const Name = styled.h1`
    color: white;
    font-size: 18px;
    margin: 0;
`

const Username = styled.p`
    color: #bdc3c7;
    font-size: 14px;
    margin: 5px 0 0 0;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Button = styled.button`
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 15px;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        opacity: 0.9;
    }
`

const AcceptButton = styled(Button)`
    background-color: #1DA1F2;
    color: white;
`

const RejectButton = styled(Button)`
    background-color: #e74c3c;
    color: white;
`

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
