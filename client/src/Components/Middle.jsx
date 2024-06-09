import React from 'react'
import styled from 'styled-components'
import Heading from './Heading'
import PostHeader from './PostHeader'
import Posts from './Posts'
const Middle = () => {
    const data = [
        {
            title: "Hello"
        },
        {
            title: "Hello"
        },
        {
            title: "Hello"
        },
        {
            title: "Hello"
        },
        {
            title: "Hello"
        },
        {
            title: "Hello"
        },
        {
            title: "Hello"
        },
        {
            title: "Hello"
        },
        {
            title: "Hello"
        },
        {
            title: "Hello"
        },
    ]
    return (
        <Container>
            <Heading />
            <PostHeader />
            {data.map((item) => (
                <Posts title={item.title} />
            ))}
        </Container>
    )
}

export default Middle

const Container = styled.div`
    display: flex;
    flex-direction: column;
    
    height: 100%;
    width: 50vw;
    border-right: 1px solid gray;
    box-sizing: border-box;
`