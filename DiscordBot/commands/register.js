const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql2')
require('dotenv').config()

// Database is from a protected file; to use your own create your own

// Given is the userID and the triviaPT

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers you in the Ergollamas and Alphpacas server!')
        .addStringOption(option =>
            option.setName('ergo')
                .setDescription('Ergo Address; can be changed later, but set to where you hold your llama.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('alph')
                .setDescription('Alephium Address; can be changed later, but set to where you hold your alpaca.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('nickname')
                .setDescription('Nickname; this is more cosmetic than anything else.')
                .setRequired(false)),
	async execute(interaction) {
        // Fetch Arguments
        const ergo = interaction.options.getString('ergo');
        const alph = interaction.options.getString('alph');
        const nickname = interaction.options.getString('nickname');
        const start_points = 0;

        // This will be to check if the game is online.
		const connection = mysql.createConnection(process.env.DATABASE_URL)
		console.log('Connected to PlanetScale!')
		console.log(interaction.member.id, "has just requested new user, with the ergo/alph address(s)", ergo, alph)

        // Data Input and Duplication Checks
        const userId = interaction.member.id;

        const sql = `SELECT * FROM ergollamas WHERE userID='${userId}'`;

        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
        
            if (results.length > 0) {
              console.log(userId, 'already exists in the database!');
              return interaction.reply({ content: 'You have already registered!', ephemeral: true });
            
              // handle case where user already exists
            } else {
                const sql_data = `INSERT INTO ergollamas (userID, ergoID, alphID, nickname, triviaPT) VALUES ('${userId}', '${ergo}', '${alph}', '${nickname}', '${start_points}')`; // Overwritten
  
                connection.query(sql_data, function (error, results, fields) {
                    if (error) throw error;
                    console.log(userId, 'added to the database!');
                });

                return interaction.reply({ content: 'You have registered, welcome and get grazing!', ephemeral: true });
            }
        });
	},
};