import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    let { login } = useUser();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate();

    {/* Login */}
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:3000/api/login", { email, password });
            login(email);
            console.log("Login Successful");
            navigate("/");
                
        } catch (err) {
            if (err.response) {
                alert("(My) Error: " + err.response.data.error);
            }
            else {
                alert("(My) Can't Connect To Server");
            }
        }
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log-in
                </Button>
            </Form>
        </div>

    );
}

export default LoginPage;