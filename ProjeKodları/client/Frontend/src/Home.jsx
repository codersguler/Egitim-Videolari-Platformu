import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import VideoGrid from './VideoGrid';
import SideBar from './SideBar';

function Home() {
    let [videos, setVideos] = useState([]);
    let [filteredVideos, setFilteredVideos] = useState([]);

    {/* Fetching Videos From Backend */}
    let fetchVideos = async () => {
        const res = await axios.get("http://localhost:3000/api/video");
        setVideos(res.data);
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    useEffect(() => {
        setFilteredVideos(videos);
    }, [videos]);

    {/* Filter Videos By Category */}
    let filterVideos = (category) => {
        if (category === "all") {
            setFilteredVideos(videos);
            return;
        }

        setFilteredVideos(videos.filter((v) => v.category === category));
    };

    return (
        <>
            <div>
                <Navbar data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => filterVideos("all")} >All</Nav.Link>
                                <Nav.Link onClick={() => filterVideos("c")} >C</Nav.Link>
                                <Nav.Link onClick={() => filterVideos("cpp")} >C++</Nav.Link>
                                <Nav.Link onClick={() => filterVideos("cs")} >C#</Nav.Link>
                                <Nav.Link onClick={() => filterVideos("java")} >Java</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={() => filterVideos("javascript")} >JavaScript</Nav.Link>
                                <Nav.Link onClick={() => filterVideos("html")} >HTML</Nav.Link>
                                <Nav.Link onClick={() => filterVideos("css")} >CSS</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>


            <Row>
                <Col xs={1} ></Col>
                <Col md={{ offset: 0 }}> <VideoGrid items={filteredVideos}> </VideoGrid> </Col>
                <Col xs={1}> </Col>

            </Row>
        </>


    );
}

export default Home;
