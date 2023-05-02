const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql2');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unregister')
    .setDescription('Removes your registration from the Ergollamas server!'),
  async execute(interaction) {
    // This will be to check if the game is online.
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to PlanetScale!');

    // Get user ID
    const userId = interaction.member.id;

    // Remove user from database
    const sql = `DELETE FROM ergollamas WHERE userID='${userId}'`;
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(userId, 'removed from the database!');
      return interaction.reply({
        content: 'You have unregistered. Hope to see you grazing someday soon!',
        ephemeral: true,
      });
    });
  },
};