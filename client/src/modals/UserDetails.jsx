import React, { useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import Logo from "../assets/Imgs/Logo.png"
import { RxCross2 } from "react-icons/rx"
import { UserContext } from '../context/UserContext'
import { updateUserWithId } from '../helper/BackendApi/sendData'

const UpdateDetails = ({ setShow }) => {
    const [name, setName] = useState('')
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('')

    const [username, setUsername] = useState('')
    const fileInputRef = useRef(null)
    const [images, setImages] = useState([])
    const handleChangeAvatar = () => {
        fileInputRef.current.click()
    }
    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImages([...images, reader.result]);
        };
    };

    const update = async () => {
        try {
            const data = {
                name,
                email,
                username,
                images: images.length ? images : undefined
            }
            console.log("Data", data)
            Object.keys(data).forEach(key => {
                if (data[key] === '' || data[key] === undefined) {
                    delete data[key]
                }
            })
            const res = await updateUserWithId(data, user._id);
            console.log(res)
            setUser(res.user)
            setShow(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <InnerContainer>
                <HeaderRow>
                    <RxCross2
                        color='white'
                        size={25}
                        style={{ margin: 10 }}
                        onClick={() => setShow(false)}
                    />
                    <Image src={Logo} alt="logo" />
                </HeaderRow>
                <Heading>Update your account</Heading>
                <DataContainer>
                    <Input
                        placeholder="Name"
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Username"
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DataContainer>
                <ChangeAvatarButton onClick={handleChangeAvatar}>Change Avatar</ChangeAvatarButton>
                <HiddenFileInput
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImage} // handle the file change event
                />
                <Button onClick={update}>Update</Button>
            </InnerContainer>
        </Container>
    )
}

export default UpdateDetails

const Container = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    backdrop-filter: blur(5px);
    justify-content: center;
    align-items: center;
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
    margin-top: 50px;
    align-items: center;
    height: 60%;
    width: 100%;
`
const Heading = styled.h1`
    color: white;
    font-size: 30px;
    margin: 10px;
    align-self: center;
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
`
const ChangeAvatarButton = styled(Button)`
    background-color: #1DA1F2;
`
const HiddenFileInput = styled.input`
    display: none;
`
