import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GoArrowLeft } from 'react-icons/go'
import { UserContext } from '../context/UserContext'
import { getAllMsgPartner } from '../helper/BackendApi/getData'
import MessageCard from './MessageCard'

const Message = () => {
    const { setSelectedOption } = useContext(UserContext)
    const [partners, setPartners] = useState([])
    useEffect(() => {
        const fetchReq = async () => {
            try {
                const res = await getAllMsgPartner();
                console.log("Msg Partner", res.messages);
                setPartners(res.messages);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchReq()
    }
        , [])
    return (
        <Container>
            <Header>
                <GoArrowLeft
                    size={25}
                    color='white'
                    style={{ marginLeft: 10 }}
                    onClick={() => setSelectedOption("Home")}

                />
                <Text>Messages</Text>
            </Header>
            {partners.length === 0 && <Text>No Messages</Text>}
            {partners.map((partner) => (
                <MessageCard key={partner._id} partner={partner} />
            ))}
        </Container>
    )
}

export default Message
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
    border-bottom: 1px solid gray;
`
const Text = styled.p`
    font-size: 20px;
    margin: 0;
    margin-left: 10px;
    align-self: center;
`