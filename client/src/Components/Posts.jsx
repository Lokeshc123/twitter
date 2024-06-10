import React from 'react'
import styled from 'styled-components'
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { formatDistanceToNow } from 'date-fns';
import { likeTweet } from '../helper/BackendApi/sendData';

const Posts = ({ tweet }) => {
    const formattedTime = formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true });
    const handleLike = async () => {
        try {
            const response = await likeTweet(tweet._id);
            console.log(response);

        }
        catch (error) {
            console.log("Error in handleLike:", error);
        }
    }
    return (
        <Container>
            <HeaderRow>
                <Image src={tweet?.user?.avatar?.url} alt="profile" />
                <TextContainer>

                    <NameContainer>
                        <Name>{tweet?.user?.name}</Name>
                        <Username>@{tweet?.user?.username}</Username>

                        <Time style={{
                            marginLeft: 10,
                            marginTop: 2

                        }}>{formattedTime}</Time>
                    </NameContainer>
                    <Content>
                        {tweet?.text}
                        {tweet.image.length > 0 && <Image src={tweet?.image[0]?.url} alt="tweet" style={{
                            width: 300,
                            height: 300,
                            objectFit: 'cover',
                            borderRadius: 10,
                            marginTop: 10
                        }} />}
                    </Content>
                </TextContainer>
            </HeaderRow>
            <IconRow>
                <IconContainer>
                    <FaRegComment size={20} color='gray' />
                    <p style={{
                        marginLeft: 5

                    }}>{tweet?.comments?.length}</p>
                </IconContainer>
                <IconContainer>
                    <BiRepost size={20} color='gray' />
                    <p style={{
                        marginLeft: 5

                    }}>{tweet?.retweets?.length}</p>
                </IconContainer>
                <IconContainer>
                    <CiHeart size={20} color='gray' onClick={handleLike} />
                    <p style={{
                        marginLeft: 5

                    }}>{tweet?.likes?.length}</p>
                </IconContainer>
            </IconRow>
        </Container>
    )
}

export default Posts

const Container = styled.div`
    display: flex;
    flex-direction: column;
   
    width: 100%;
    border: 1px solid gray;
   
   
   
    color :white;
`
const HeaderRow = styled.div`
    display: flex;
    padding :10px;
    flex-direction: row;
    width: 100%;
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;

`
const NameContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 5px;
    margin-top: 0;
 
`
const Name = styled.h1`
    color: white;
    font-size: 20px;
    margin-right: 5px;
    margin-top: 0 ;
`
const Username = styled.p`
    color: gray;
    font-size: 15px;
    margin-top: 2px;
`
const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;

    width: 100%;
`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 0;
`
const IconRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    align-items: center;
    justify-content: space-evenly;
    margin-left : 50px;
    padding: 10px;
`
const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
    color: gray;
    
    cursor: pointer;
`
const Time = styled.p`
    color: gray;
    font-size: 15px;
    margin-top: 0;
`