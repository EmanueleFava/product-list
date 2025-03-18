import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ProductModal({ show, handleClose, handleSubmit, product }) {
    const [formData, setFormData] = useState({
        nome: '',
        descrizione: '',
        prezzo: '',
        immagine: '',
        stato: 1
    });

    useEffect(() => {
        if (product) {
            setFormData({
                nome: product.nome || '',
                descrizione: product.descrizione || '',
                prezzo:  product.prezzo || '',
                immagine: product.immagine || '',
                stato: product.stato || 1
            });
        } else {
            // Resetta i dati quando non c'è un utente selezionato (aggiungi utente)
            setFormData({
                nome: '',
                descrizione: '',
                prezzo: '',
                immagine: '',
                stato: 1
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{product ? 'Modifica Prodotto' : 'Aggiungi Prodotto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control type="text" name="descrizione" value={formData.descrizione} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Url Immagine</Form.Label>
                        <Form.Control type="text" name="immagine" value={formData.immagine} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Prezzo</Form.Label>
                        <Form.Control type="number" name="prezzo" value={formData.prezzo} onChange={handleChange} />
                     </Form.Group>

                    <Form.Group>
                        <Form.Label>Stato</Form.Label>
                        <Form.Control as="select" name="stato" value={formData.stato} onChange={handleChange}>
                            <option value={1}>Disponibile</option>
                            <option value={0}>Non Disponibile</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Chiudi</Button>
                <Button variant="primary" onClick={() => handleSubmit(formData)}>Salva</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default ProductModal;