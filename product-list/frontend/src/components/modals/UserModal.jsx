import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UserModal({ show, handleClose, handleSubmit, user }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        ruolo: 'utente',
        stato: 1
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: '',
                ruolo: user.ruolo || 'utente',
                stato: user.stato || 1
            });
        } else {
            // Resetta i dati quando non c'è un utente selezionato (aggiungi utente)
            setFormData({
                username: '',
                email: '',
                password: '',
                ruolo: 'utente',
                stato: 1
            });
        }
    }, [user]);

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
                <Modal.Title>{user ? 'Modifica Utente' : 'Aggiungi Utente'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ruolo</Form.Label>
                        <Form.Control as="select" name="ruolo" value={formData.ruolo} onChange={handleChange}>
                            <option value="utente">Utente</option>
                            <option value="amministratore">Amministratore</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Stato</Form.Label>
                        <Form.Control as="select" name="stato" value={formData.stato} onChange={handleChange}>
                            <option value={1}>Attivo</option>
                            <option value={0}>Inattivo</option>
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


export default UserModal;