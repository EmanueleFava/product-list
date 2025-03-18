const Prodotto = require("../models/Prodotto");
const User = require("../models/User");  // Aggiungi l'import per il modello User

const createProdotto = async (req, res) => {
    const { admin_id } = req.params;
    const { nome, descrizione, prezzo, immagine, stato } = req.body;

    try {
        // Verifica se l'amministratore esiste e ha il ruolo "amministratore"
        const admin = await User.findOne({ where: { id: admin_id } });
        if (!admin || admin.ruolo !== "amministratore") {
            return res.status(403).json({ error: "Accesso negato. Utente non autorizzato." });
        }

        const prodotto = await Prodotto.create({
            nome,
            descrizione,
            prezzo,
            immagine,
            stato
        });
        res.status(201).json(prodotto);
    } catch (error) {
        res.status(400).json({ error: "Errore nella creazione del prodotto", error });
    }
};

const getProdotti = async (req, res) => {
    try {
        const prodotti = await Prodotto.findAll({ where: { stato: 1 } });
        res.json(prodotti);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero dei prodotti", error });
    }
};

const getAllProdotti = async (req, res) => {
    const { admin_id } = req.params;

    try {
        // Verifica se l'amministratore esiste e ha il ruolo "amministratore"
        const admin = await User.findOne({ where: { id: admin_id } });
        if (!admin || admin.ruolo !== "amministratore") {
            return res.status(403).json({ error: "Accesso negato. Utente non autorizzato." });
        }

        const prodotti = await Prodotto.findAll();
        res.json(prodotti);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero dei prodotti eliminati", error });
    }
};

const getProdottoById = async (req, res) => {
    try {
        const prodotto = await Prodotto.findOne({ where: { id: req.params.id, stato: 1 } });
        if (!prodotto) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }
        res.json(prodotto);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero del prodotto", error });
    }
};

const updateProdotto = async (req, res) => {
    const { admin_id } = req.params;

    try {
        // Verifica se l'amministratore esiste e ha il ruolo "amministratore"
        const admin = await User.findOne({ where: { id: admin_id } });
        if (!admin || admin.ruolo !== "amministratore") {
            return res.status(403).json({ error: "Accesso negato. Utente non autorizzato." });
        }

        const prodotto = await Prodotto.findOne({ where: { id: req.params.id } });
        if (!prodotto) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }

        await Prodotto.update(req.body, { where: { id: req.params.id } });
        const updatedProdotto = await Prodotto.findOne({ where: { id: req.params.id } });
        res.json(updatedProdotto);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento del prodotto", error });
    }
};

const toggleStatoProdotto = async (req, res) => {
    const { admin_id, id } = req.params;

    try {
        // Verifica se l'amministratore esiste e ha il ruolo "amministratore"
        const admin = await User.findOne({ where: { id: admin_id } });
        if (!admin || admin.ruolo !== "amministratore") {
            return res.status(403).json({ error: "Accesso negato. Utente non autorizzato." });
        }

        const prodotto = await Prodotto.findOne({ where: { id } });
        if (!prodotto) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }

        const newStatus = prodotto.stato === 1 ? 0 : 1;
        await Prodotto.update({ stato: newStatus }, { where: { id } });
        
        const updatedProduct = await Prodotto.findOne({ where: {id} });
        res.status(200).json({ message: "Stato prodotto cambiato con successo", updatedProduct});
    } catch (error) {
        res.status(500).json({ error: "Errore nell'update dello stato del prodotto", error });
    }
};

module.exports = {
    createProdotto,
    getProdotti,
    getProdottoById,
    getAllProdotti,
    updateProdotto,
    toggleStatoProdotto
};
