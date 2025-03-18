import { Form, Alert, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import './FormLogin.css';

function FormLogin() {
    const defaultUser = {
        username: '',
        password: ''
    };

    const [user, setUser] = useState(defaultUser);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();
    const { login } = useAuth(); 

    async function handleSubmit(event) {
        event.preventDefault(); 
        setLoading(true);  // Attiva il loader
        setMessage({ type: '', text: '' }); // Reset messaggi

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", user);
            setMessage({ type: 'success', text: 'Login effettuato con successo!' });
            login(response.data.user, response.data.token);
            console.log("Risposta server:", response.data);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setMessage({ type: 'danger', text:  error.response?.data.error });
            console.error("Errore login:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setUser(prevUser => ({
            ...prevUser,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <Form className="form-login" onSubmit={handleSubmit}>
            <h1>Login</h1>

            {/* Mostra un messaggio di errore o successo */}
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}

            <Form.Group controlId="username" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Inserisci il tuo username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                    type="password"
                    placeholder="Inserisci password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <button className="btn-form" type="submit" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Log In"}
            </button>
        </Form>
    );
}

export default FormLogin;
