import React, { useState } from 'react'
import styled from 'styled-components'

const Heading = () => {
    const [active, setActive] = useState('For You');

    return (
        <Container>
            <Block onClick={() => setActive('For You')}>
                <Text isActive={active === 'For You'}>For You</Text>
            </Block>
            <Block onClick={() => setActive('Following')}>
                <Text isActive={active === 'Following'}>Following</Text>
            </Block>
        </Container>
    )
}

export default Heading

const Container = styled.div`
    display: flex;
   height : 100px;
    width: 100%;
    border-bottom: 1px solid gray;
`

const Block = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    &:hover {
        background-color: #1A1A1A;
    }
`

const Text = styled.p`
    color: white;
    font-size: 18px;
    text-align: center;
    border-bottom: ${(props) => (props.isActive ? '4px solid #1DA1F2' : 'none')};
    padding-bottom: 5px;
`
