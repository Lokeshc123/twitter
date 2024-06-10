import React, { useState } from 'react'
import styled from 'styled-components'
import { RxCross2 } from "react-icons/rx";
import Logo from "../assets/Imgs/Logo.png"
import { UpTweet } from '../helper/BackendApi/sendData';
const UpdatePost = ({ setShowModal, id }) => {
    const [title, setTitle] = useState('')
    const handleUpdate = async () => {
        try {
            const data = {
                text: title
            }
            const response = await UpTweet(data, id);
            alert(response.message)
            setShowModal(false)
        }
        catch (error) {
            console.log(error)
        }
    };
    return (


        <Container>
            <InnerContainer>
                <HeaderRow>

                    <RxCross2 color='white' size={25} style={{
                        margin: 10
                    }}
                        onClick={() => setShowModal(false)}
                    />
                    <Image src={Logo} alt="logo" />
                </HeaderRow>
                <InputField placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Button onClick={handleUpdate}>
                    Update
                </Button>
            </InnerContainer>
        </Container>
    )
}

export default UpdatePost

const Container = styled.div`
display : flex;
position: fixed;
top: 0;
left: 0;
z-index: 1000;
justify-content: center;
align-items: center;
right: 0;
bottom: 0;
height: 100vh;
width: 100vw;
background-color: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(5px);
`
const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
 
    background-color: #000000;
    height: 35%;
    width: 35%;
border-radius: 30px;
`
const HeaderRow = styled.div`
    display: flex;
    flex-direction: row;
  justify-content: space-between;
    align-items: center;
    height: 10%;
    width: 53%;

`
const Image = styled.img`
    width: 50px;
    height: 50px;
    object-fit: contain;
    align-self: center;
`
const InputField = styled.input`
    background-color: #1A1A1A;
    color: white;
    border: none;
    border-radius: 10px;
    height: 50px;
    width: 80%;
    margin-left: 10%;
    margin-top: 40px;
    font-size: 20px;
`
const Button = styled.button`
    background-color: #1DA1F2;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 15px;
    width : 200px;
    font-size: 20px;
    align-self: center;
    margin-top: 30px;
    margin-bottom: 0px;
    cursor: pointer;
`