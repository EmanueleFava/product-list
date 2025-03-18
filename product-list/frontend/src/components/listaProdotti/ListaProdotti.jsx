import React, { useState, useEffect } from 'react';
import CardProdotto from '../cards/CardProdotto';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from "axios";
import  ProductModal  from '../modals/ProductModal';
import { Modal, Button, Form } from 'react-bootstrap';



function ListaProdotti(){

    const { isLogged, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const user = isLogged ? JSON.parse(localStorage.getItem('user')) : null;

       useEffect(() => {
            if (!user) {
                navigate('/');
                return;
            }
            fetchAllProducts();
        }, [isAdmin]);

    const fetchAllProducts = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const fetch = isAdmin ? `http://localhost:3000/api/prodotti/get-prodotti/${user.id}` : `http://localhost:3000/api/prodotti/prodotti-disponibili`;
            const response = await axios.get(fetch, {
                headers: { Authorization: `Bearer ${token}` }
            });
        

            setProducts(response.data);

        } catch (error) {
            console.error("Errore fetch:", error.response ? error.response.data : error.message);
        }
    }

    const handleAddProduct = () => {
        setSelectedProduct(null);  
        setShowModal(true);    
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);  
        setShowModal(true);     
    };


    const handleSubmit = async (formData) => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            if (selectedProduct) {
                // Modifica utente esistente
                await axios.put(`http://localhost:3000/api/prodotti/aggiorna-prodotto/${user.id}/${selectedProduct.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`http://localhost:3000/api/prodotti/crea-prodotto/${user.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchAllProducts(); // Ricarica la lista degli utenti
            setShowModal(false);
        } catch (error) {
            console.error("Errore:", error.response ? error.response.data : error.message);
        }
    };

    const toggleStatus = async (productId) => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            await axios.put(`http://localhost:3000/api/prodotti/cambia-status/${user.id}/${productId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchAllProducts(); // Ricarica la lista degli utenti
        } catch (error) {
            console.error("Errore cambio stato:", error.response ? error.response.data : error.message);
        }
    };

    return (

        <Container className="container-margin">
            {isAdmin && <Button onClick={handleAddProduct}>Aggiungi Prodotto</Button>}
        <Row style={{ marginTop: '20px', marginBottom: '50px' }}>
            {products.length > 0 ? (
                products.map((product) => (
                    <Col key={product.id} style={{ marginTop: '20px' }}>
                        <CardProdotto
                            immagine={product.immagine}
                            nome={product.nome}
                            prezzo={product.prezzo}
                            stato={product.stato}
                            descrizione={product.descrizione}
                            id={product.id}
                            toggleStatus={() => toggleStatus(product.id)}
                            edit={() => handleEditProduct(product)}
                        />
                    </Col>
                ))
            ) : (
                <p>No products found</p>
            )}
        </Row>
        <ProductModal show={showModal} handleClose={() => setShowModal(false)} handleSubmit={handleSubmit} product={selectedProduct} />
    </Container>



    )





}



export default ListaProdotti;