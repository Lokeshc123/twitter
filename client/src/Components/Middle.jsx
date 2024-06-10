import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Heading from './Heading';
import PostHeader from './PostHeader';
import Posts from './Posts';
import { UserContext } from '../context/UserContext';
import { getAllTweets } from '../helper/BackendApi/getData';

const Middle = () => {
    const { user } = useContext(UserContext);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await getAllTweets();
                console.log("Response", res.tweets);
                // Sort tweets by latest first
                const sortedTweets = res.tweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setTweets(sortedTweets);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTweets();
    }, []);

    return (
        <Container>
            <Heading />
            <PostHeader setTweets={setTweets} />
            {tweets.map((tweet) => (
                <Posts key={tweet._id} tweet={tweet} />
            ))}
        </Container>
    );
}

export default Middle;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    border-right: 1px solid gray;
    box-sizing: border-box;
`;
