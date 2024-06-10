import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CiSearch } from "react-icons/ci";
import { getNews } from '../helper/ExternalApi';
import { getAllUsers } from '../helper/BackendApi/getData';
import DropDownItem from './DropDownItem';

const Right = () => {
    const [randomNews, setRandomNews] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState([]);
    const searchBarRef = useRef(null);

    useEffect(() => {
        const getUs = async () => {
            try {
                const res = await getAllUsers();
                setUsers(res.users);
            } catch (error) {
                console.log(error);
            }
        };
        getUs();
    }, []);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await getNews();

                const selectOneFromEachCluster = (clusters) => {
                    return clusters.map(cluster => {
                        const newsItems = cluster.News;
                        const randomIndex = Math.floor(Math.random() * newsItems.length);
                        return newsItems[randomIndex];
                    });
                };

                const selectedNews = selectOneFromEachCluster(response.news);
                setRandomNews(selectedNews);

                console.log("Selected news from each cluster", selectedNews);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTrending();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredUsers = users
        .filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(0, 5);

    return (
        <Container>
            <SearchBar ref={searchBarRef} onClick={() => setDropdownVisible(true)}>
                <CiSearch color='gray' size={30} style={{ marginLeft: 5 }} />
                <SearchInput
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {dropdownVisible && (
                    <DropdownMenu>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <DropDownItem key={index} user={user} />
                            ))
                        ) : (
                            <DropdownItem>No users found</DropdownItem>
                        )}
                    </DropdownMenu>
                )}
            </SearchBar>
            <Subscribe>
                <Heading>Subscribe to Premium</Heading>
                <Paragraph>
                    Subscribe to unlock new features, if eligible receive a share of ad revenue
                </Paragraph>
                <Button>Subscribe</Button>
            </Subscribe>
            <TrendingThings>
                <Heading>What's happening now</Heading>
                {randomNews.map((news, index) => (
                    <TrendNews key={index}>
                        <Image src={news.Image} />
                        <ContentContainer>
                            <Title># {news.Categories.label}</Title>
                            <Title style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{news.Title}</Title>
                        </ContentContainer>
                    </TrendNews>
                ))}
            </TrendingThings>
        </Container>
    );
};

export default Right;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 100vh;
    width: 30vw;
`;

const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 52px;
    width: 100%;
    margin-bottom: 5px;
    background-color: #1A1A1A;
    margin-left: 10px;
    border-radius: 30px;
    position: relative;
    &:hover {
        border: 2px solid #1DA1F2;
    }
`;

const SearchInput = styled.input`
    height: 40px;
    width: 69%;
    border: none;
    background-color: #1A1A1A;
    margin-left: 10px;
    font-size: 18px;
    padding-left: 10px;
    outline: none;
    color: white;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 55px;
    left: 5;
    background-color: #000000;
    width: 95%;
    box-shadow: 0 4px 8px 0 rgba(173, 216, 230, 0.4), 0 6px 20px 0 rgba(0, 0, 255, 0.3);
    border-radius: 0 0 10px 10px;
    padding: 10px;
    z-index: 1;
    color: white;
`;



const Subscribe = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid gray;
    border-radius: 20px;
    align-self: center;
`;

const Heading = styled.p`
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
`;

const Paragraph = styled.p`
    color: #f5f5f5;
    font-size: 18px;
    margin-top: 10px;
`;
const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #1A1A1A;
    }
`;

const Button = styled.button`
    background-color: #1DA1F2;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px;
    font-size: 16px;
    width: 100px;
    cursor: pointer;
`;

const TrendingThings = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid gray;
    border-radius: 20px;
    align-self: center;
`;

const TrendNews = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 20px;
    align-self: center;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 20px;
`;

const Title = styled.p`
    color: white;
    font-size: 16px;
    margin-top: 10px;
    margin-left: 10px;
    font-weight: bold;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    height: 100px;
    width: 250px;
`;
