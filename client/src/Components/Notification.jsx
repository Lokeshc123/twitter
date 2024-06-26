import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GoArrowLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { getAllMsgReq, getFrnReq } from '../helper/BackendApi/getData'
import FollowCard from './FollowCard'
const Notification = () => {
    const navigate = useNavigate()
    const { setSelectedOption } = useContext(UserContext)
    const [followRequests, setFollowRequests] = useState([])
    const [allMsgReq, setAllMsgReq] = useState([])
    useEffect(() => {
        const fetchReq = async () => {
            try {
                const res = await getFrnReq()
                const res_msg = await getAllMsgReq();
                console.log("Msg Req", res_msg.messageRequestsReceived);
                setAllMsgReq(res_msg.messageRequestsReceived);


                setFollowRequests(res.followRequestsReceived)

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
                <Text>Notifications</Text>
            </Header>
            {followRequests.length === 0 && allMsgReq.length === 0 && <Text>No Notifications</Text>}
            {followRequests.map((req) => (
                <FollowCard key={req._id} msg={false} req={req} setFollowRequests={setFollowRequests} />
            ))}

            {allMsgReq.map((req) => (
                <FollowCard key={req._id} msg={true} req={req} setFollowRequests={setFollowRequests} />
            ))}


        </Container>
    )
}

export default Notification

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