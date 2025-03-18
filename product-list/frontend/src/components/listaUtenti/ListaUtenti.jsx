import React, { useState, useEffect } from 'react';
import CardUser from "../cards/CardUser";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from "axios";
import  UserModal  from '../modals/UserModal';
import { Modal, Button, Form } from 'react-bootstrap';
import './ListaUtenti.css'

function ListaUtenti() {
    const { isLogged } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const user = isLogged ? JSON.parse(localStorage.getItem('user')) : null;

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const adminId = user.id;
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const response = await axios.get(`http://localhost:3000/api/auth/get-users/${adminId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Errore fetch:", error.response ? error.response.data : error.message);
        }
    };

    const handleAddUser = () => {
        setSelectedUser(null);  // Azzera i dati utente per aggiungere
        setShowModal(true);     // Mostra il modal per aggiungere utente
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);  // Imposta l'utente da modificare
        setShowModal(true);     // Mostra il modal per modificare
    };

    const handleSubmit = async (formData) => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            if (selectedUser) {
                // Modifica utente esistente
                await axios.put(`http://localhost:3000/api/auth/update-user/${user.id}/${selectedUser.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // Aggiungi nuovo utente
                await axios.post(`http://localhost:3000/api/auth/create-utente/${user.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchUsers(); // Ricarica la lista degli utenti
            setShowModal(false);
        } catch (error) {
            console.error("Errore:", error.response ? error.response.data : error.message);
        }
    };

    const toggleStatus = async (userId) => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            await axios.put(`http://localhost:3000/api/auth/cambia-status/${user.id}/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers(); // Ricarica la lista degli utenti
        } catch (error) {
            console.error("Errore cambio stato:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container className="container-margin">
            <Button onClick={handleAddUser}>Aggiungi Utente</Button>
            <Row style={{ marginTop: '20px', marginBottom: '50px' }}>
                {users.length > 0 ? (
                    users.map((user) => (
                        <Col key={user.id} style={{ marginTop: '20px' }}>
                            <CardUser
                                username={user.username}
                                email={user.email}
                                ruolo={user.ruolo}
                                stato={user.stato}
                                id={user.id}
                                toggleStatus={() => toggleStatus(user.id)}
                                edit={() => handleEditUser(user)}
                            />
                        </Col>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </Row>
            <UserModal show={showModal} handleClose={() => setShowModal(false)} handleSubmit={handleSubmit} user={selectedUser} />
        </Container>
    );    
}

export default ListaUtenti;
