import React, { useState } from 'react'
import styled from 'styled-components'
import SignUp from '../modals/SignUp';

import Logo from "../assets/Imgs/Logo.png"
import SignIn from '../modals/SignIn';
const LandingPage = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    return (
        <Container style={{
            backgroundColor: showSignUp || showSignIn ? '#242d34' : 'black'

        }}>
            <LeftSide>
                <Image src={Logo} alt="logo" />
            </LeftSide>
            <RigthSide>
                <InnerContainer>
                    <Heading>Happening Now</Heading>
                    <Content>
                        <Title>Join today.</Title>
                        <Buttons>
                            <ButtonContainer>
                                <ButtonImage src="https://blog.hubspot.com/hubfs/image8-2.jpg" alt="google" />
                                <Text>Sign Up with Google</Text>
                            </ButtonContainer>
                            <Dot>
                                or
                            </Dot>

                        </Buttons>
                        {showSignUp && <SignUp setShowSignUp={setShowSignUp} />}
                        <CreateAccountButton onClick={() => setShowSignUp(true)}>
                            Create Account
                        </CreateAccountButton>
                    </Content>
                    <AlreadyAccount>
                        Already have an account ?
                    </AlreadyAccount>
                    {showSignIn && <SignIn setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />}
                    <AlreadyButton
                        style={{
                            backgroundColor: showSignUp ? '#242d34' : 'black',
                            color: showSignUp || showSignIn ? '#1DA1F2' : '#ffffff'

                        }}
                        onClick={() => setShowSignIn(true)}
                    >
                        Sign in
                    </AlreadyButton>
                </InnerContainer>
            </RigthSide>
        </Container>
    )
}

export default LandingPage

const Container = styled.div`
    display: flex;
    background-color: #000000;
    height: 100vh;
    width: 100vw;
`
const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 57vw;
    height: 100vh;
`

const Image = styled.img`
    width: 500px;
    height: 500px;
    object-fit: cover;
`

const RigthSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 43vw;
    height: 100vh;
`

const Heading = styled.h1`
    color: #ffffff;
    font-weight: bold;
    font-size: 70px;
    margin-bottom: 5px;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 90%;
    width: 100%;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 50%;
`

const Title = styled.h1`
    color: #ffffff;
    font-weight: bold;
    font-size: 35px;
`
const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 100%;
    border-bottom: 1px solid gray;
    position: relative;
`
const ButtonContainer = styled.button`
    background-color: #ffffff;
    color: #000000;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 10px;
    border-radius: 30px;
    cursor: pointer;
    height: 50px;
    width: 100%;
    border: none;
    padding: 0 20px;
`

const Dot = styled.p`
    color: #ffffff;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    border-radius: 50%;
    background-color: #000000;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 72%;
`
const ButtonImage = styled.img`
    width: 30px;
    border-radius: 50%;
    height: 30px;
    object-fit: cover;
`

const Text = styled.p`
    color: #000000;
    margin-left: 10px;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 20px;
`
const CreateAccountButton = styled.button`
    background-color: #1DA1F2;
    color : #ffffff;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 10px;
    border-radius: 30px;
    cursor: pointer;
    height: 50px;
    border: none;
`
const AlreadyAccount = styled.p`
    color: #ffffff;
    font-weight: bold;
    font-size: 20px;
    margin-top: 20px;
`
const AlreadyButton = styled.button`
    background-color: #000000;
    color: #1DA1F2;
    font-weight: bold;
    font-size: 20px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    flex-direction: row;
    margin-top: 10px;
    border-radius: 30px;
    cursor: pointer;
    height: 50px;
    border: 1px solid gray;
    width : 50%
`