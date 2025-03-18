const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db"); // Configurazione Sequelize
const cors = require("cors"); // Middleware per CORS
const authRoutes = require("./routes/authRoutes");
const authProdotto = require("./routes/prodottoRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parsing JSON
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/prodotti", authProdotto);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		message: "Errore interno del server",
		error: err.message,
	});
});

module.exports = app; // Esportazione dell'app
