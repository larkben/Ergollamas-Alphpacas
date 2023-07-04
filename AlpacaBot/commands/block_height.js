const { SlashCommandBuilder } = require('discord.js');
import { NodeProvider } from '@alephium/web3';

const nodeProvider = new NodeProvider('http://localhost:22973') // ? This will be the port for your own local node

async function get_height() 
{ // Gets the height of the blockchain
    result = await nodeProvider.blockflow.getBlockflowChainInfo({
        fromGroup: 0,
        toGroup: 0
      })
    return result
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('block_height')
		.setDescription('Fetches alephium block height'),
	async execute(interaction) {
		return interaction.reply({ content: get_height(), ephemeral: true });
	},
};