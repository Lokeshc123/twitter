import React from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
const Home = () => {
    return (
        <Container>
            <InnerContainer>
                <Navbar />
            </InnerContainer>
        </Container>
    )
}

export default Home

const Container = styled.div`
    display: flex;
    flex-direction: column;
   justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #000000;
`
const InnerContainer = styled.div`
    display: flex;
   
   
    height: 100%;
    width: 85%;
   
`