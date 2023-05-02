const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql2')
require('dotenv').config()

// Database is from a protected file; to use your own create your own

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription('Updates your registered information!')
        .addStringOption(option =>
            option.setName('ergo')
                .setDescription('New Ergo Address.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('nickname')
                .setDescription('New Nickname.')
                .setRequired(false)),
	async execute(interaction) {
        const ergo = interaction.options.getString('ergo');
        const nickname = interaction.options.getString('nickname');
        const userId = interaction.member.id;

        const connection = mysql.createConnection(process.env.DATABASE_URL)
        console.log('Connected to the database!')

        let sql = `UPDATE ergollamas SET `;
        if (ergo) {
            sql += `ergoID='${ergo}' `;
        }
        if (nickname) {
            sql += `nickname='${nickname}' `;
        }
        sql += `WHERE userID='${userId}'`;

        connection.query(sql, function (error, results, fields) {
            if (error) throw error;

            if (results.affectedRows === 0) {
                return interaction.reply({ content: 'You are not registered yet!', ephemeral: true });
            }

            console.log(userId, 'updated in the database!');
            return interaction.reply({ content: 'Your information has been updated!', ephemeral: true });
        });
	},
};