import React from 'react'
import styled from 'styled-components'
import { IoMdHome } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";
import { LuUser2 } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { PiDotsThreeCircleLight } from "react-icons/pi";

const Navbar = () => {
    return (
        <Container>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/X_logo.jpg/1200px-X_logo.jpg" alt="logo" />
            <IconsList>
                <IconContainer>
                    <IoMdHome color='white' size={32} />
                    <Text>Home</Text>
                </IconContainer>
                <IconContainer>
                    <CiSearch color='white' size={32} />
                    <Text>Search</Text>
                </IconContainer>
                <IconContainer>
                    <IoIosNotificationsOutline color='white' size={32} />
                    <Text>Notifications</Text>
                </IconContainer>
                <IconContainer>
                    <FaRegMessage color='white' size={25} style={{ marginLeft: 5 }} />
                    <Text>Messages</Text>
                </IconContainer>
                <IconContainer>
                    <TbUsers color='white' size={25} style={{ marginLeft: 5 }} />
                    <Text>Communities</Text>
                </IconContainer>
                <IconContainer>
                    <FaXTwitter color='white' size={25} style={{ marginLeft: 5 }} />
                    <Text>Premium</Text>
                </IconContainer>
                <IconContainer>
                    <LuUser2 color='white' size={25} style={{ marginLeft: 5 }} />
                    <Text>Profile</Text>
                </IconContainer>
                <IconContainer>
                    <PiDotsThreeCircleLight color='white' size={30} style={{ marginLeft: 3 }} />
                    <Text>More</Text>
                </IconContainer>
                <Button>
                    Post
                </Button>
                <Bottom>
                    <ProfileImage src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717718400&semt=ais_user" alt="profile" />
                    <Content>
                        <Name>John Doe</Name>
                        <Username>@johndoe</Username>
                    </Content>
                </Bottom>
            </IconsList>

        </Container>
    )
}

export default Navbar

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    /* height: 100vh; */
    width: 20vw;
    border-right: 1px solid gray;
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    object-fit: contain;
`

const IconsList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 52px;
    margin-bottom: 5px;
    margin-left: 10px;
`

const Text = styled.p`
    color: white;
    font-size: 22px;
    margin-left: 10px; 
    text-align: center;
`

const Button = styled.button`
    background-color: #1DA1F2;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 15px;
    font-size: 20px;
    margin-top: 15px;
    cursor: pointer;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    
    border-radius: 30px;
    width: 100%;
    margin-top: 20px;
`

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-left: 10px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;  
    justify-content: center;
    margin-left: 10px;
    overflow: hidden; 
`

const Name = styled.p`
    color: white;
    font-size: 18px;
    font-weight: bold;
   margin : 0;
    
    white-space: nowrap;  
    overflow: hidden;  
    text-overflow: ellipsis;  
`

const Username = styled.p`
    color: gray;
    font-size: 12px;
    margin: 0;
    white-space: nowrap;  
    overflow: hidden;  
    text-overflow: ellipsis;  
`
