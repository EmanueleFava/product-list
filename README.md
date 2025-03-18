# Product List

## Descrizione del Progetto
Questo progetto rappresenta un'applicazione web per la gestione dei prodotti e degli utenti.
L'applicazione fornisce diverse funzionalità a seconda del ruolo dell'utente:
- **Amministratore**: Può eseguire operazioni di **CRUD** (Creazione, Lettura, Aggiornamento, Eliminazione) su utenti e prodotti.
- **Utente Registrato**: Può solo visualizzare i prodotti disponibili nel database.

## Tecnologie Utilizzate

### Backend
- **Node.js** con **Express** per la gestione delle API RESTful.
- **Sequelize** come ORM per l'interazione con il database MySQL.
- **JWT (JSON Web Token)** per l'autenticazione e la gestione degli accessi.

### Frontend
- **React** per la creazione dell'interfaccia utente.
- **React Bootstrap** per lo stile e il design responsive.
- **Axios** per la gestione delle richieste HTTP verso il backend.

### Database
- **MySQL** per la memorizzazione dei dati.

## Autenticazione e Permessi
L'app utilizza **JWT** per autenticare gli utenti.
Gli utenti devono includere il token JWT nelle richieste protette, inserendolo nell'header `Authorization`:
```bash
Authorization: Bearer your_token
```

## Licenza
Questo progetto è distribuito sotto la licenza MIT.

