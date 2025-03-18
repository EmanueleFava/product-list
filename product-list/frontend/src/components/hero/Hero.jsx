import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeroText from './hero-text/HeroText';
import HeroImg from './hero-img/HeroImg';

function Hero(){


    return (
        <Container style={{marginTop: '100px'}} >
            <Row className='g-0' style={{marginTop: '40px'}}>
                <Col md={4} style={{textAlign: 'left'}}><HeroText/></Col>
                <Col md={{span: 5, offset: 3}} style={{marginTop: '-40px'}}><HeroImg/></Col>
            </Row>
        </Container>



    )




}


export default Hero;