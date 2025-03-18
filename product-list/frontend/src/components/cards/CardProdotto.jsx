import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";
import "./Card.css"

function CardProdotto({ nome, prezzo, descrizione, immagine, stato, edit, toggleStatus }) {

    const { isAdmin } = useAuth();

    return (
        <Card style={{ width: '18rem' }} className='card-custom'>
            <Link to={'/dettaglio-prodotto'} state={{ product: { nome, prezzo, descrizione, immagine, stato } }}>
                <Card.Img 
                    variant="top" 
                    src={immagine} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer' }} 
                />
            </Link>
            <Card.Body>
                <Card.Title>{nome}</Card.Title>
                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                    <strong>Prezzo:</strong> {prezzo} {"\n"}
                    <strong>Stato:</strong> {stato === 0 ? "Non disponibile\n" : "Disponibile\n"}
                    {descrizione}
                </Card.Text>
                {isAdmin && (
                    <>
                        <Button variant="primary" className="mx-2" onClick={edit}>Edit</Button>
                        <Button variant="danger" onClick={toggleStatus}>Cambia Stato</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default CardProdotto;
