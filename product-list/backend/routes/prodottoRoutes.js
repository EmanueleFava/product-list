const express = require("express");
const {
    createProdotto,
    getProdotti,
    getProdottoById,
    getAllProdotti,
    updateProdotto,
    toggleStatoProdotto
} = require("../controller/prodottoController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Crea un nuovo prodotto
router.post("/crea-prodotto/:admin_id", authMiddleware, createProdotto);

// Ottieni tutti i prodotti attivi (status: 1)
router.get("/prodotti-disponibili/",authMiddleware, getProdotti);

// Ottieni tutti i prodotti eliminati (status: 0)
router.get("/get-prodotti/:admin_id", authMiddleware ,getAllProdotti);

// Ottieni un prodotto per ID
router.get("/prodotto/:id", authMiddleware, getProdottoById);

// Aggiorna un prodotto esistente
router.put("/aggiorna-prodotto/:admin_id/:id", authMiddleware, updateProdotto);

// Elimina (disabilita) un prodotto
router.put("/cambia-status/:admin_id/:id", authMiddleware, toggleStatoProdotto);

module.exports = router;
