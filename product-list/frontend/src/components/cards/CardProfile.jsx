import UserProfile from '../../assets/blue-circle-with-white-user_78370-4707.jpg';
import Card from 'react-bootstrap/Card';

function CardProfile({username, id, email, ruolo, stato}){

    return (

        <>
           <Card style={{ width: '18rem' }} className='card-custom'>
            <Card.Img variant="top" src={UserProfile} style={{width: '180px', margin: 'auto'}}/>
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                    <strong>id: </strong>{id} {"\n"}
                    <strong>email: </strong> {email} {"\n"}
                    <strong>ruolo: </strong> {ruolo} {"\n"}
                    <strong>stato: </strong> {stato === 0 ? "inattivo" : "attivo"}
                </Card.Text>
            </Card.Body>
            </Card>
        </>



    )






}





export default CardProfile;