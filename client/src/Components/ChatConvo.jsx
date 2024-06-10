import React from 'react'
import styled from 'styled-components'
const ChatConvo = ({ messages, loggedInUserId }) => {
    console.log("Messages", messages)
    return (
        <ChatContainer>
            {messages.map((msg) => (
                <MessageContainer key={msg._id} sentByUser={msg.senderId === loggedInUserId}>
                    <MessageBubble sentByUser={msg.senderId === loggedInUserId}>
                        {msg.senderId !== loggedInUserId && <SenderName>{msg.senderName} </SenderName>}
                        {msg.message}
                    </MessageBubble>
                </MessageContainer>
            ))}

        </ChatContainer>
    );
}

export default ChatConvo
const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px;
 
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.sentByUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.sentByUser ? '#fff' : '#1DA1F2')};
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  color: ${(props) => (props.sentByUser ? '#000000' : '#fff')};
  margin :5px;
  font-size: 18px;
`;

const SenderName = styled.span`
  font-weight: bold;
`;