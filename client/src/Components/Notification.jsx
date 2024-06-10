import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GoArrowLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { getFrnReq } from '../helper/BackendApi/getData'
import FollowCard from './FollowCard'
const Notification = () => {
    const navigate = useNavigate()
    const { setSelectedOption } = useContext(UserContext)
    const [followRequests, setFollowRequests] = useState([])
    useEffect(() => {
        const fetchReq = async () => {
            try {
                const res = await getFrnReq()

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
            {followRequests.map((req) => (
                <FollowCard key={req._id} req={req} />
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
`