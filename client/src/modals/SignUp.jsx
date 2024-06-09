import React, { useState } from 'react'
import styled from 'styled-components'
import { RxCross2 } from "react-icons/rx";
import Logo from "../assets/Imgs/Logo.png"
import { registerUser } from '../helper/BackendApi/sendData';

const SignUp = ({ setShowSignUp }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')

    const register = async () => {
        try {
            if (password !== confirmPassword) {
                alert("Passwords do not match")
                return
            }
            const data = {
                name,
                email,
                password,
                username
            }
            console.log("Data", data)
            const response = await registerUser(data);
            console.log(response)

        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <InnerContainer>
                <HeaderRow>

                    <RxCross2 color='white' size={25} style={{
                        margin: 10
                    }}
                        onClick={() => setShowSignUp(false)}
                    />
                    <Image src={Logo} alt="logo" />
                </HeaderRow>
                <DataContainer>
                    <Heading>
                        Create your account
                    </Heading>
                    <Input placeholder="Name"
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    />

                    <Input placeholder="Username"
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input placeholder="Email"
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input placeholder="Password"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <Input placeholder="Confirm Password"
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}

                    />

                </DataContainer>
                <Button onClick={register}>
                    Sign Up
                </Button>

            </InnerContainer>
        </Container>
    )
}

export default SignUp

const Container = styled.div`
    display: flex;
    
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
`
const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
 
    background-color: #000000;
    height: 85%;
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
const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 80%;
    width: 100%;
    margin-bottom: 0px;

`

const Heading = styled.h1`
    color: white;
    font-size: 30px;
    margin: 10px;
`
const Input = styled.input`
    height: 40px;
    width: 80%;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    font-size: 20px;
    background-color: #333333;
    color: white;
    outline: none;
    ::placeholder {
        color: white;
    }
`
const Button = styled.button`
    height: 50px;
    width: 50%;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    font-size: 20px;
    align-self: center;
    background-color: #1DA1F2;
    color: white;
    outline: none;
    cursor: pointer;
    margin-top : 0;
`