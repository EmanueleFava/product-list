const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Prodotto = sequelize.define('Prodotto', {
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  descrizione: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prezzo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  immagine: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  stato: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  tableName: 'prodotti',
  timestamps: false,
});

module.exports = Prodotto;