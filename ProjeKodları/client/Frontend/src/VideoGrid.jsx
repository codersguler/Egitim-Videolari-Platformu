import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function VideoGrid(props) {


    return (
        <>
            <Row xs={1} md={4} className="g-4 mt-0">
                {Array.from(props.items).map((item, index) => (
                    <Col key={item._id} >
                        <Link to={`/video/${item._id}`} style={{ textDecoration: "none"}}>
                            <Card className='bg-secondary'>
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        src={item.url}
                                        title={item.title}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                {console.log(item.date)}
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text className='text-muted'>{item.description}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="me-auto">

                                    <small className="text-muted"> {item.date} </small>
                                    <small className="text-muted"> {item.author} </small>
                                </Card.Footer>

                            </Card>
                        </Link>

                    </Col>
                ))}
            </Row>
        </>


    );
}

export default VideoGrid;