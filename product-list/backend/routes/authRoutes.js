const express = require("express");

const {
    createUtente,
    logInUser,
    logoutUser,
    getUsers,
    updateUsername,
    updatePassword,
    updateUser,
    toggleUserStatus,
} = require("../controller/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Registra un nuovo utente
router.post("/create-utente/:admin_id", createUtente);

// Esegui il login
router.post("/login", logInUser);

// Esegui il logout
router.post("/logout", logoutUser);

// ottieni tutti gli utenti 
router.get("/get-users/:admin_id", authMiddleware ,getUsers)

// Aggiorna l'username di un utente tramite id 
router.put("/update-username/:admin_id/:id", authMiddleware, updateUsername);

// Aggiorna la password di un utente tramite id
router.put("/update-password/:admin_id/:id", authMiddleware, updatePassword);

router.put("/update-user/:admin_id/:id", authMiddleware, updateUser);

// Disattiva o attiva un utente tramite id
router.put("/cambia-status/:admin_id/:id", authMiddleware, toggleUserStatus);

module.exports = router;