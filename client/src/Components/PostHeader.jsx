import React from 'react'
import styled from 'styled-components'
import { CiImageOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlinePoll } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
const PostHeader = () => {
    return (
        <Container>
            <Content>

                <ProfileImage src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717718400&semt=ais_user" alt="profile" />
                <TextInput placeholder="What is happening?!" />
            </Content>
            <IconContainer>
                <LeftRow>
                    <CiImageOn color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                    <CiVideoOn color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                    <MdOutlineGifBox color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                    <MdOutlinePoll color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                    <MdOutlineEmojiEmotions color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                    <IoLocationOutline color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                </LeftRow>
                <RightRow>
                    <Button>Post</Button>
                </RightRow>
            </IconContainer>
        </Container>
    )
}

export default PostHeader

const Container = styled.div`
    display: flex;
    flex-direction: column;
 
    height: 18%;
    width: 100%;
    border-bottom: 1px solid gray;
`
const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin : 5px;
`
const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60%;
  margin-left: 5px;
    width: 100%;
`

const TextInput = styled.input`
    height: 40px;
    width: 80%;
   border :none;
   background-color: #000000;
  
    margin-left: 10px;
    font-size: 30px;
    padding-left: 10px;
    font-size: 18px;
    outline: none;
    color :white;
`
const IconContainer = styled.div`
    display: flex;

    flex-direction: row;
    justify-content: space-between;
    height: 40%;
    width: 100%;
`
const LeftRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
`
const RightRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 5px;
`
const Button = styled.button`
    background-color: #1DA1F2;
    color: white;
    border: none;
    border-radius: 30px;
   height : 40px;
    width: 100px;
   
    font-size: 20px;
    cursor: pointer;
`
