import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { CiImageOn, CiVideoOn } from 'react-icons/ci';
import { MdOutlineGifBox, MdOutlinePoll, MdOutlineEmojiEmotions } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { UserContext } from '../context/UserContext';
import { createTweet } from '../helper/BackendApi/sendData';

const PostHeader = ({ setTweets }) => {
    const { user } = useContext(UserContext);
    const [tweet, setTweet] = useState('');
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImages([...images, reader.result]);
        };
    };

    const postTweet = async () => {
        try {
            const data = {
                text: tweet,
                image: images,
            };
            console.log(data); // To verify the data structure
            const res = await createTweet(data);
            console.log(res); // To verify the response
            const modifiedTweet = { ...res.tweet, user };

            setTweet('');
            setImages([]);

            setTweets((prevTweets) => [modifiedTweet, ...prevTweets]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Container>
            <Content>
                <ProfileImage src={user?.avatar?.url} alt="profile" />
                <TextInput
                    placeholder="What is happening?!"
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                />
                <HiddenFileInput
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImage}
                />
            </Content>
            <IconContainer>
                <LeftRow>
                    <CiImageOn
                        color='#1DA1F2'
                        size={30}
                        style={{ marginLeft: 5 }}
                        onClick={handleIconClick}
                    />
                    <CiVideoOn color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                    <MdOutlineGifBox color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                    <MdOutlinePoll color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                    <MdOutlineEmojiEmotions color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                    <IoLocationOutline color='#1DA1F2' size={30} style={{ marginLeft: 5 }} />
                </LeftRow>
                <RightRow>
                    <Button onClick={postTweet}>Post</Button>
                </RightRow>
            </IconContainer>
        </Container>
    );
};

export default PostHeader;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 18%;
    width: 100%;
    border-bottom: 1px solid gray;
`;

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin: 5px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60%;
    margin-left: 5px;
    width: 100%;
`;

const TextInput = styled.input`
    height: 40px;
    width: 80%;
    border: none;
    background-color: #000000;
    margin-left: 10px;
    font-size: 30px;
    padding-left: 10px;
    font-size: 18px;
    outline: none;
    color: white;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40%;
    width: 100%;
`;

const LeftRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
`;

const RightRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 5px;
`;

const Button = styled.button`
    background-color: #1DA1F2;
    color: white;
    border: none;
    border-radius: 30px;
    height: 40px;
    width: 100px;
    font-size: 20px;
    cursor: pointer;
`;
