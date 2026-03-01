import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/api/register", { email, username, password });
        navigate("/");
    }

    return (
        <div style={{ height: "100vh", width: "50%", margin: "0 auto", marginTop: "10%"}}>
            <Form onSubmit={(e) => handleSubmit(e)} className="m-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-light">Email address</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label className="text-light">Username</Form.Label>
                    <Form.Control onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign-in
                </Button>
            </Form>
        </div>

    );
}

export default RegisterPage;