const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql2');
require('dotenv').config();

// Start of Discord Function Implementation

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify-holding')
    .setDescription('Displays the number of llamas you own to everyone for the clout'),

  async execute(interaction) {
    const userId = interaction.member.id; // Discord Member ID

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query('SELECT llamas FROM ergollamas WHERE userID = ?', [userId],
      async (error, results) => {
        if (error) {
          console.error('Error retrieving llamas:', error);
          return;
        }

        if (results.length === 0) {
          console.log('User not found in the database');
          return;
        }

        const llamasOwned = results[0].llamas;

        return interaction.reply({ content: `You own ${llamasOwned} ErgoLlamas.`, ephemeral: false });
      }
    );
  },
};