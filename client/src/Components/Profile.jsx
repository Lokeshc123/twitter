import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GoArrowLeft } from 'react-icons/go'
import { UserContext } from '../context/UserContext'
import { getUserTweets } from '../helper/BackendApi/getData'
import Posts from './Posts'
import UpdateDetails from '../modals/UserDetails'
const Profile = () => {
    const { setSelectedOption, user } = useContext(UserContext)
    const [tweets, setTweets] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await getUserTweets(user._id);
                console.log("Response", res.tweets);

                const sortedTweets = res.tweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const tweetsWithUser = sortedTweets.map(tweet => ({ ...tweet, user: user }));
                setTweets(tweetsWithUser);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTweets();
    }, [user]);

    return (
        <Container style={{
            backgroundColor: show ? "#1A1A1A" : "#000000"
        }}>
            <Header>
                <GoArrowLeft
                    size={25}
                    color='white'
                    style={{ marginLeft: 10 }}
                    onClick={() => setSelectedOption("Home")}

                />
                <Text>Profile</Text>
            </Header>
            <Image src="https://wallpapers.com/images/featured/forest-pictures-ghluxfda78g0i0ap.jpg" alt="profile" />
            <UserDetails>
                <BasicDetails>

                    <ProfileImage src={user?.avatar?.url} alt="profile" style={{ marginLeft: 10, marginTop: 5 }} />
                    <TextContainer>
                        <Name>{user?.name}</Name>
                        <Username>@{user?.username}</Username>
                    </TextContainer>
                </BasicDetails>
                <OtherDetails>
                    <Text>Following  {user.following.length}</Text>
                    <Text>Followers  {user.followers.length}</Text>
                    <Text>Tweets     {user.tweets.length}</Text>

                </OtherDetails>
                {show && <UpdateDetails setShow={setShow} />}
                <UpdateDetailsButton onClick={() => setShow(true)}>
                    Update
                </UpdateDetailsButton>
            </UserDetails>
            {tweets.map((tweet) => (
                <Posts key={tweet._id} tweet={tweet} />
            ))}
        </Container>
    )
}

export default Profile

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    border: 1px solid gray;
    color : white;
   
`
const Header = styled.div`
    display: flex;
    padding: 10px;

    
`
const Text = styled.p`
    font-size: 20px;
    margin-left: 10px;
    margin-top : 0px;
    margin-bottom: 0;
`

const Image = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    margin : 0;
`
const UserDetails = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
   
    justify-content: space-evenly;
`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    margin-left: 10px;
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
const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`

const OtherDetails = styled.div`
    display: flex;
    flex-direction: row;
  
    align-self: center;
`
const UpdateDetailsButton = styled.button`
    background-color: #1DA1F2;
    color: white;
    height : 50px;
    width: 100px;
    border: none;
    border-radius: 30px;
    padding: 5px;
    font-size: 20px;
    margin-top : 10px;

    
    cursor: pointer;
`
const BasicDetails = styled.div`
    display: flex;
    flex-direction: row;
   
    align-items: center;
`