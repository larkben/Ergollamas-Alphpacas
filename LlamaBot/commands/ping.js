const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Checks to see if the discord bot is online.'),
	async execute(interaction) {
		return interaction.reply({ content: 'Secret Pong!', ephemeral: true });
	},
};


