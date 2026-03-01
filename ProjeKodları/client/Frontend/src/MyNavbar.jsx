import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useUser } from './UserContext';

// Navbar
function MyNavbar() {
    let { logout, user } = useUser();


    return (
        <Navbar data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">MyEdu</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {
                            user
                            ?
                            <Nav.Link href="/upload">Upload</Nav.Link>
                            :
                            <Nav.Link href="/login">Upload</Nav.Link>
                        }
                    </Nav>
                    <Nav>
                        {user
                            ?
                            <Nav.Link onClick={logout} href="/">Log-out</Nav.Link>
                            :
                            <>
                                <Nav.Link href="/register">Sign-in</Nav.Link>
                                <Nav.Link href="/login">Log-in</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;