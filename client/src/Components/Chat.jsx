import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext';
import { GoArrowLeft } from 'react-icons/go'
import { IoSend } from "react-icons/io5";
import { getConvo } from '../helper/BackendApi/getData';
import { sendMsg } from '../helper/BackendApi/sendData';
import ChatConvo from './ChatConvo';
import { SocketContext } from '../context/SocketContext';
const Chat = () => {
    const { setSelectedOption, setSelectedMsg, selectedMsg, user } = useContext(UserContext);
    const [convo, setConvo] = useState([]);
    const [msg, setMsg] = useState("");
    const { onlineUsers, socket } = useContext(SocketContext);
    console.log("Online Users", onlineUsers);
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setConvo(prevConvo => [...prevConvo, newMessage]);

        });

        return () => socket?.off("newMessage");
    }, [socket]);

    useEffect(() => {
        const fetchConvo = async () => {
            try {
                const res = await getConvo(user._id, selectedMsg._id);

                setConvo(res);
                console.log("Convo", convo);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchConvo()
    }, [selectedMsg])
    const sendMessage = async () => {
        try {
            const data = {
                senderId: user._id,
                receiverId: selectedMsg._id,
                message: msg
            }
            const res = await sendMsg(data);
            setConvo([...convo, res.data]); // Assuming response contains the new message
            setMsg("");
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <Header>
                <GoArrowLeft
                    size={25}
                    color='white'
                    style={{ marginLeft: 10 }}
                    onClick={() => { setSelectedOption("Messages"); setSelectedMsg(null) }}

                />
                <Text>{selectedMsg.name}</Text>
            </Header>
            <ChatContainer>
                <ChatConvo messages={convo} loggedInUserId={user._id} />

            </ChatContainer>
            <SendMessage >
                <Message placeholder="Type a message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <IconContainer>

                    <IoSend onClick={sendMessage} />
                </IconContainer>
            </SendMessage>
        </Container>
    )
}

export default Chat
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    border: 1px solid gray;
    color :white;
   
`

const Header = styled.div`
    display: flex;
    padding: 10px;

`
const Text = styled.p`
    font-size: 20px;
    margin: 0;
    margin-left: 10px;
    align-self: center;
`
const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 79vh;
   
    
`
const SendMessage = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #1A1A1A;
    justify-content: center;
    align-items: center;
    width : 95%;
    border-radius: 30px;
    align-self :  center;
    
`
const Message = styled.input`
    width: 90%;
    height: 50px;
    padding: 10px;
    font-size: 20px;
    color: white;
    border-radius: 25px;
    background-color: #1A1A1A;
    border: none;
    outline: none;
`
const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: #1DA1F2;
    border-radius: 50%;
    margin-right: 5px;
`