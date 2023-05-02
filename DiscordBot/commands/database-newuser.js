const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql2')
require('dotenv').config()

// Database is from a protected file; to use your own create your own

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers you in the Ergollamas server!'),
	async execute(interaction) {
        // This will be to check if the game is online.
		const connection = mysql.createConnection(process.env.DATABASE_URL)
		console.log('Connected to PlanetScale!')
		console.log(interaction.member.id, "has just requested new user.")
        // Data Input

        const userId = interaction.member.id;

        const sql = `SELECT * FROM users WHERE userID='${userId}'`;

        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
        
            if (results.length > 0) {
              console.log(userId, 'already exists in the database!');
              return interaction.reply({ content: 'You have already registered!', ephemeral: true });
            
              // handle case where user already exists
            } else {
                const sql_data = `INSERT INTO users (userID) VALUES ('${userId}')`; // Overwritten
  
                connection.query(sql_data, function (error, results, fields) {
                    if (error) throw error;
                    console.log(userId, 'added to the database!');
                });

                return interaction.reply({ content: 'You have registered, welcome and get grazing!', ephemeral: true });
            }
        });
	},
};