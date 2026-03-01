import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useUser } from './UserContext';

function SideBar() {
    let { logout, user } = useUser();


    return (
        <div>
            <Navbar data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/all">All</Nav.Link>
                            <Nav.Link href="/cs">C</Nav.Link>
                            <Nav.Link href="/cpp">C++</Nav.Link>
                            <Nav.Link href="/cs">C#</Nav.Link>
                            <Nav.Link href="/java">Java</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/javacript">JavaScript</Nav.Link>
                            <Nav.Link href="/html">HTML</Nav.Link>
                            <Nav.Link href="/css">CSS</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    );
}

export default SideBar;