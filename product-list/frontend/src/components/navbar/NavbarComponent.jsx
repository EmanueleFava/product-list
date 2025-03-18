import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavbarComponent() {
    const { isLogged, isAdmin, logout } = useAuth(); 

    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed='top' data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Gestionale Crud</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto justify-content-end">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    { isLogged ? 
                    (
                        <NavDropdown title="Gestionale" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/profilo">
                        Profilo
                        </NavDropdown.Item>
                        { isAdmin ? 
                            <NavDropdown.Item as={Link} to="/utenti">
                            Utenti
                            </NavDropdown.Item> : ""
                        }
                        <NavDropdown.Item as={Link} to="/prodotti">
                        Prodotti
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout} as={Link} to="/">
                        Logout
                        </NavDropdown.Item>
                        </NavDropdown>
                    ) :  <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
