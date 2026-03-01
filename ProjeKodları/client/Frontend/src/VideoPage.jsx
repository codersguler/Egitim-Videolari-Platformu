import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useUser } from './UserContext';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import CardText from 'react-bootstrap/esm/CardText';
import Form from 'react-bootstrap/Form';

function VideoPage(props) {
    let { user } = useUser();

    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    let [totalLike, setTotalLike] = useState("");

    let fetchVideo = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/video/${id}`);
            setVideo(res.data);
            setTotalLike(res.data.likeTotal);
        }
        catch (err) {
            console.log("(My) " + err);
        }
    }
    let fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/video/${id}/comments`);
            res.data.reverse();
            setComments(res.data);
        }
        catch (err) {
            console.log("(My) " + err);
        }
    }

    useEffect(() => {
        fetchVideo();
        fetchComments();
    }, [id]);

    if (!video) return <p>LOADING...</p>;

    let submitComment = async (e) => {
        if (user) {
            e.preventDefault();
            await axios.post(`http://localhost:3000/api/video/${id}/comments`, { user: user.email, text: comment });
            fetchComments();
        } else {
            e.preventDefault();

            return;
        }

    };


    let submitLike = async (e) => {
        if (user) {
            e.preventDefault();
            await axios.post(`http://localhost:3000/api/video/${id}/Like`, { user: user.email });
            setTotalLike((totalLike) => totalLike + 1);
        } else {
            e.preventDefault();

            return;
        }

    };

    return (
        <div className='bg-dark'>
            <Container>
                <Card>
                    <div className="ratio ratio-16x9">
                        <iframe
                            src={video.url}
                            title={video.title}
                            allowFullScreen
                        ></iframe>
                    </div>
                    <Card.Body className='bg-dark'>
                        <Row>
                            <Col md={1}>
                                <Form onSubmit={(e) => { submitLike(e) }}>
                                    <div className='d-grid gap-2'>
                                        <Button type="submit" > Like! {totalLike} </Button>
                                    </div>
                                </Form>
                            </Col>
                            <Col md={11}>
                                <Form onSubmit={(e) => submitComment(e)}>
                                    <div className='d-grid gap-2'>
                                        <Row>
                                            <Col md={10}>
                                                <Form.Control className='bg-dark text-light'
                                                    onChange={(e) => setComment(e.target.value)}
                                                    value={comment}
                                                    type="text"
                                                    id="comment"
                                                />
                                                <Form.Text id="comment"></Form.Text>
                                            </Col>
                                            <Col md={2}>
                                                <Button type="submit" > Send Comment </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            <Container>
                {
                    Array.isArray(comments) && comments.length > 0 ? (comments.map((item, index) => (
                        <Card key={index}>
                            <Card.Body className='bg-dark text-light'>
                                <Card.Title> {item.user} </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"> <p className='text-light'> {new Date(item.date).toLocaleString("tr-TR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })} </p>  </Card.Subtitle>
                                <Card.Text>
                                    {item.text}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )))
                        :
                        (
                            <p>No Comments</p>
                        )

                }


            </Container>
        </div>
    );
}

export default VideoPage;