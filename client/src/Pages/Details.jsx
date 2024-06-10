import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoArrowLeft } from 'react-icons/go';
import { UserContext } from '../context/UserContext';
import { sendFollowRequest, sendMsgRequest } from '../helper/BackendApi/sendData';
import { getUserTweets } from '../helper/BackendApi/getData';
import Posts from '../Components/Posts';

const Details = () => {
    const { user } = useContext(UserContext);
    const { selectedUser, setSelectedUser } = useContext(UserContext);
    const [tweets, setTweets] = useState([]);
    const [requestSent, setRequestSent] = useState(false);
    console.log("Selected User", selectedUser._id);
    const SendMsgRequest = async () => {
        try {
            const res = await sendMsgRequest(selectedUser._id);
            console.log("Response", res);
            alert(res.message);
        }
        catch (error) {
            console.log(error);
        }
    };
    const sendReq = async () => {
        try {
            const res = await sendFollowRequest(selectedUser._id);
            console.log("Response", res);
            alert(res.message);

            setRequestSent(true);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await getUserTweets(selectedUser._id);
                console.log("Response", res.tweets);

                const sortedTweets = res.tweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const tweetsWithUser = sortedTweets.map(tweet => ({ ...tweet, user: selectedUser }));
                setTweets(tweetsWithUser);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTweets();
    }, [selectedUser]);

    return (
        <Container>
            <Header>
                <GoArrowLeft
                    size={25}
                    color='white'
                    style={{ marginLeft: 10, marginTop: 10 }}
                    onClick={() => setSelectedUser(null)}
                />
                <ProfileImage src={selectedUser?.avatar?.url} alt="profile" style={{ marginLeft: 10, marginTop: 5 }} />
                <TextContainer>
                    <Name>{selectedUser.name}</Name>
                    <Username>@{selectedUser.username}</Username>
                </TextContainer>
            </Header>
            <Image src="https://wallpapers.com/images/featured/forest-pictures-ghluxfda78g0i0ap.jpg" alt="profile" />

            <ProfileDetailsContainer>
                <ProfileDetails>
                    <ProfileDetailsText>Followers  {selectedUser.followers.length}</ProfileDetailsText>
                    <ProfileDetailsText>Following {selectedUser.following.length}</ProfileDetailsText>
                    <ProfileDetailsText>Tweets {selectedUser.tweets.length}</ProfileDetailsText>
                </ProfileDetails>
                <ButtonContainer>
                    <FollowButton onClick={sendReq}>{requestSent ? "Req Sent" : "Follow"}</FollowButton>
                    <SendMessageButton onClick={SendMsgRequest}>Message Req</SendMessageButton>
                </ButtonContainer>
            </ProfileDetailsContainer>
            {tweets.map((tweet) => (
                <Posts key={tweet._id} tweet={tweet} />
            ))}
        </Container>
    );
};

export default Details;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    border-right: 1px solid gray;
`;

const Header = styled.div`
    display: flex;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    margin-left: 10px;
`;

const Name = styled.h1`
    color: white;
    font-size: 20px;
    margin: 0;
`;

const Username = styled.p`
    color: gray;
    font-size: 15px;
    margin-top: 5px;
`;

const Image = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
`;

const ProfileImage = styled.img`
  
    width: 50px;
    height: 50px;
   
    border-radius: 50%;
    object-fit: cover;
`;

const ProfileDetailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 0;
`;

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: row;
`;

const ProfileDetailsText = styled.p`
    color: white;
    font-size: 18px;
    margin-right: 20px;
`;

const FollowButton = styled.button`
    background-color: #1DA1F2;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 15px;
    margin-right: 10px;
    font-size: 15px;
    cursor: pointer;
`;
const SendMessageButton = styled.button`
    background-color: #fff;
    color: black;
    border: none;
    border-radius: 30px;
    padding: 15px;
    font-size: 15px;
    cursor: pointer;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
