import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import { useUser } from './UserContext';


function UploadPage() {
    let { user } = useUser();
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [url, setUrl] = useState("");
    let [category, setCategory] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        await axios.post("http://localhost:3000/api/video", { url, title, description, author: user.email, category });
        console.log("Uploaded!");
    }

    return (
        <div style={{ height: "100vh", width: "50%", margin: "0 auto", marginTop: "10%"}}>
            <Form onSubmit={(e) => handleSubmit(e)} className="m-5">
                <Form.Group className="mb-3" controlId="formVideoURL">
                    <Form.Label className="text-light">Video Url</Form.Label>
                    <Form.Control onChange={(e) => setUrl(e.target.value)} value={url} type="text" placeholder="Video URL" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formVideoTitle">
                    <Form.Label className="text-light">Video Title</Form.Label>
                    <Form.Control onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Title" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formVideoDescription">
                    <Form.Label className="text-light">Description</Form.Label>
                    <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="A Short Decription Of The Video" />
                </Form.Group>
                <Form.Label className="text-light">Category</Form.Label>
                <Form.Select onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                    <option >Select a Category</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="cs">C#</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                </Form.Select>


                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>
        </div>

    );
}

export default UploadPage;