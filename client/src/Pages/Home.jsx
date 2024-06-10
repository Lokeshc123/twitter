import React, { useContext } from 'react';
import styled from 'styled-components';
import Navbar from '../Components/Navbar';
import Right from '../Components/Right';
import Middle from '../Components/Middle';
import Explore from '../Components/Explore';
import Notification from '../Components/Notification';
import { UserContext } from '../context/UserContext';
import Details from './Details';
import Profile from '../Components/Profile';
import Message from '../Components/Message';
import Chat from '../Components/Chat';

const Home = () => {
    const { selectedUser, selectedOption, selectedMsg, } = useContext(UserContext);
    console.log("Selected Option", selectedOption);

    const renderContent = () => {
        if (selectedUser) {
            return <Details />;
        }
        if (selectedMsg) {
            return <Chat />;
        }
        switch (selectedOption) {
            case 'Home':
                return <Middle />;
            case 'Search':
                return <Explore />;
            case 'Notifications':
                return <Notification />;
            case 'Profile':
                return <Profile />;
            case 'Messages':
                return <Message />;
            default:
                return <Middle />;
        }
    };

    return (
        <Container>
            <InnerContainer>
                <Navbar />
                {renderContent()}
                <Right />
            </InnerContainer>
        </Container>
    );
};

export default Home;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background-color: #000000;
`;

const InnerContainer = styled.div`
    display: flex;
    width: 85%;
`;
