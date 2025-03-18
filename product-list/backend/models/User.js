const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true, // Assicurati che sia unico
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	ruolo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	stato: {
		type: DataTypes.TINYINT,
		defaultValue: 1
	},
}, {
    tableName: 'users'
});


module.exports = User;
