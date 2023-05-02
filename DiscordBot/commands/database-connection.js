const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql2')
require('dotenv').config()

// Database is from a protected file; to use your own create your own

module.exports = {
	data: new SlashCommandBuilder()
		.setName('data')
		.setDescription('Replies with DataPong!'),
	async execute(interaction) {
        // This will be to check if the game is online.
		const connection = mysql.createConnection(process.env.DATABASE_URL)
		console.log('Connected to PlanetScale!')
		console.log(interaction.member.id, "has just requested ping.")
		connection.end()
		return interaction.reply({ content: 'Secret Data! The Database is Online', ephemeral: true });
	},
};