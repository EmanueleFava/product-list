import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { FaArrowUp } from 'react-icons/fa'; // Importa l'icona della freccia

function Footer() {
    // Funzione per tornare in cima
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Navbar bg="light" className="py-3" fixed="bottom">
            <Container className="d-flex flex-column align-items-center">
                {/* Bottone per tornare in cima */}
                <Row className="mb-2">
                    <Col className="text-center">
                        <button 
                            onClick={scrollToTop} 
                            className="btn btn-dark"
                        >
                            <FaArrowUp /> 
                        </button>
                    </Col>
                </Row>

                {/* Testo del copyright */}
                <Row>
                    <Col className="text-center">
                        <p>&copy; 2025 E-Commerce. Tutti i diritti riservati.</p>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default Footer;