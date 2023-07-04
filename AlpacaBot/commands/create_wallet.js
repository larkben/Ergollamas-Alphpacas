const { SlashCommandBuilder } = require('discord.js');
import { NodeProvider } from '@alephium/web3';
import { NodeWallet, PrivateKeyWallet } from '@alephium/web3-wallet';

// import private key from .env file // this is to be kept secret

const nodeProvider = new NodeProvider('http://localhost:22973') // ? This will be the port for your own local node

const wallet = new PrivateKeyWallet()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('block_height')
		.setDescription('Fetches alephium block height'),
	async execute(interaction) {
		return interaction.reply({ content: get_height(), ephemeral: true });
	},
};