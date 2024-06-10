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

const Home = () => {
    const { selectedUser, selectedOption } = useContext(UserContext);
    console.log("Selected Option", selectedOption);

    const renderContent = () => {
        if (selectedUser) {
            return <Details />;
        }
        switch (selectedOption) {
            case 'Home':
                return <Middle />;
            case 'Search':
                return <Explore />;
            case 'Notifications':
                return <Notification />;
            case 'Profile':
                return <Profile />
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
