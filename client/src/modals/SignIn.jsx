import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { RxCross2 } from "react-icons/rx";
import Logo from "../assets/Imgs/Logo.png"
import { loginUser } from '../helper/BackendApi/sendData';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
const SignIn = ({ setShowSignIn, setShowSignUp }) => {
    const cookies = new Cookies()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const signIn = async () => {
        try {
            const data = {
                email,
                password
            }
            console.log("Data", data)
            const response = await loginUser(data);
            if (response.user) {
                cookies.set('token_auth', response.token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                navigate('/home')
                setUser(response.user)
            }


        }
        catch (error) {
            alert("Invalid Credentials")
        }
    }
    return (
        <Container>
            <InnerContainer>
                <HeaderRow>

                    <RxCross2 color='white' size={25} style={{
                        margin: 10
                    }}
                        onClick={() => setShowSignIn(false)}
                    />
                    <Image src={Logo} alt="logo" />
                </HeaderRow>
                <Heading>
                    Sign In To X
                </Heading>
                <DataContainer>



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


                </DataContainer>
                <Button onClick={signIn}>
                    Sign In
                </Button>
                <ForgetPasswordButton>
                    Forget Password
                </ForgetPasswordButton>
                <Footer>
                    Dont have an account ?    <span style={{
                        color: '#1DA1F2',
                        cursor: 'pointer',
                        marginLeft: 5

                    }}
                        onClick={() => {
                            setShowSignIn(false)
                            setShowSignUp(true)

                        }}
                    > Sign Up</span>
                </Footer>
            </InnerContainer>
        </Container>
    )
}

export default SignIn

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
    height: 30%;
    width: 100%;
    margin-top : 50px;

`

const Heading = styled.h1`
    color: white;
    font-size: 30px;
    margin: 10px;
    align-self : center;
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
const ForgetPasswordButton = styled.button`
    height: 50px;
    width: 50%;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    font-size: 20px;
    align-self: center;
    background-color: #fff;
    color: black;
    outline: none;
    cursor: pointer;
    margin-top : 0;
`
const Footer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 10%;
    color  :white;
    width: 100%;
    margin-top : 0;
`
const SignUpButton = styled.button`
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