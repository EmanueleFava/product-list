const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TokenBlacklist = require("../models/TokenBlacklist");
const generateToken = require("./generateToken");

const createUtente = async (req, res) => {
	const { admin_id } = req.params;
	const { username, email, password, ruolo, stato } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
  
	try {
	  const admin = await User.findOne({ where: { id: admin_id }});
	  if (!admin || admin.ruolo !== "amministratore") {
		return res
		  .status(403)
		  .json({ error: "Accesso negato. Utente non autorizzato." });
	  } else {
		try {
		  const user = await User.create({
			username,
			email,
			password: hashedPassword,
			ruolo,
			stato
		  });
		  res.status(201).json(user);
		} catch (error) {
		  console.error(error); // Stampa l'errore nel terminale
		  res.status(400).json({ error: "L'utente esiste già o input non validi." });
		}
	  }
	} catch (error) {
	  console.error(error); // Stampa l'errore nel terminale
	  res.status(500).json({ error: "Errore interno del server.", error });
	}
  };
  
  const logInUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
        return res.status(401).json({ error: "Credenziali non valide" });
    }

    if (user.stato === 0) {
        return res.status(403).json({ error: "Account disabilitato o inattivo" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenziali non valide" });
    }

    const token = generateToken(user);
    res.json({ user, token });
};


const logoutUser = async (req, res) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return res.status(400).send({ error: "Fornire il token!" });
	}

	try {
		// Decodifica il token e ottieni il token ID (jti)
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		// Aggiungi il token ID nella tabella blacklist usando Sequelize
		await TokenBlacklist.create({ token_id: decoded.jti });

		res.status(200).send({ message: "Logout eseguito" });
	} catch (error) {
		res.status(401).send({
			error: "Token invalido o scaduto",
		});
	}
};

const getUsers = async (req, res) => {
	const { admin_id } = req.params;

	try {
		const admin = await User.findOne({ where: { id: admin_id } });
        if (!admin || admin.ruolo !== "amministratore") {
            return res.status(403).json({ error: "Accesso negato. Utente non autorizzato." });
        }
		const users = await User.findAll();
		if (!users) {
            return res.status(404).json({ error: "Users non trovati" });
        }
		res.json(users);
	} catch (error) {
        res.status(500).json({ error: "Errore nel fetch degli users", error });
    }
}


const updateUser = async (req, res) => {
    const { admin_id } = req.params;

    try {
        const admin = await User.findOne({ where: { id: admin_id } });
        if (!admin || admin.ruolo !== "amministratore") {
            return res.status(403).json({ error: "Accesso negato. Utente non autorizzato." });
        }

        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ error: "User non trovato" });
        }

        // Se nel body è presente una password, esegui l'hashing
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;  // Sostituisci la password con quella hashata
        }

        // Aggiorna l'utente con i nuovi dati
        await User.update(req.body, { where: { id: req.params.id } });
        const updatedUser = await User.findOne({ where: { id: req.params.id } });
        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento dell'user", error });
    }
};


const updateUsername = async (req, res) => {
	const { admin_id, id } = req.params;  // admin_id e id per l'utente da aggiornare
	const newUsername = req.body.username;
  
	try {
	  // Controlla se l'amministratore esiste e ha il ruolo "amministratore"
	  const admin = await User.findOne({ where: { id: admin_id } });
	  if (!admin || admin.ruolo !== "amministratore") {
		return res.status(403).json({ error: "Accesso negato. Utente non autorizzato." });
	  }
  
	  const user = await User.findOne({ where: { id } });
	  if (!user) {
		return res.status(404).json({ error: "User non trovato", id });
	  }
  
	  // Aggiorna il nome utente
	  const updateUsername = await User.update(
		{ username: newUsername },
		{ where: { id: id } },
	  );
  
	  const updatedUser = await User.findOne({ where: { id } });
	  res.status(200).json({
		messaggio: "Nome utente aggiornato",
		updatedUser,
	  });
	} catch (error) {
	  res.status(500).json({ error: "Errore interno del server" });
	}
  };
  
  const updatePassword = async (req, res) => {
	const { admin_id, id } = req.params;  // admin_id e id per l'utente da aggiornare
	const newPassword = req.body.password;
	const hashedPassword = await bcrypt.hash(newPassword, 10);
  
	try {
	  // Controlla se l'amministratore esiste e ha il ruolo "amministratore"
	  const admin = await User.findOne({ where: { id: admin_id } });
	  if (!admin || admin.ruolo !== "amministratore") {
		return res.status(403).json({ error: "Accesso negato. Utente non autorizzato." });
	  }
  
	  const user = await User.findOne({ where: { id } });
	  if (!user) {
		return res.status(404).json({ error: "User non trovato" });
	  }
  
	  // Aggiorna la password
	  await User.update(
		{ password: hashedPassword },
		{ where: { id: id } },
	  );
  
	  const updatedUser = await User.findOne({ where: { id } });
	  res.status(200).json({
		messaggio: "Password utente aggiornata",
		updatedUser,
	  });
	} catch (error) {
	  res.status(500).json({ error: "Errore interno del server" });
	}
  };
  
  const toggleUserStatus = async (req, res) => {
	const { admin_id, id } = req.params;  // admin_id e id per l'utente da aggiornare
  
	try {
	  // Controlla se l'amministratore esiste e ha il ruolo "amministratore"
	  const admin = await User.findOne({ where: { id: admin_id } });
	  if (!admin || admin.ruolo !== "amministratore") {
		return res.status(403).json({ error: "Accesso negato. Utente non autorizzato." });
	  }
  
	  const user = await User.findOne({ where: { id } });
	  if (!user) {
		return res.status(404).json({ error: "User non trovato" });
	  }
  
	  // Cambia lo stato dell'utente (attivo o disattivo)
	  const newStatus = user.stato === 1 ? 0 : 1;
	  await User.update({ stato: newStatus }, { where: { id } });
  
	  const updatedUser = await User.findOne({ where: { id } });
	  res.status(200).json({
		messaggio: "Stato utente aggiornato",
		updatedUser,
	  });
	} catch (error) {
	  res.status(500).json({ error: "Errore interno del server" });
	}
  };
  


module.exports = {
	createUtente,
	logInUser,
	logoutUser,
	getUsers,
	updateUsername,
	updatePassword,
	updateUser,
	toggleUserStatus,
};
