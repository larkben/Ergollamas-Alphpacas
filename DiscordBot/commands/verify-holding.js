const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql2')
require('dotenv').config()

// Token Verification Functions
async function get_token(address, mint_address) {
  const url = `https://api.ergoplatform.com/api/v1/addresses/${address}/balance/confirmed`; // api call
  let valid_tokens = 0; // total user valid tokens

  try {
    const response = await fetch(url); // await lets the api reach before continuing
    if (!response.ok) { // '!' makes it not okay
      throw new Error('Error: Failed to retrieve data');
    }

    const data = await response.json(); // wait for the json

    for (const token of data.tokens) { // loop through elements in json
      const ID = token.tokenId; // shorthand / json output path
      if (await check_mint(ID, mint_address) === 1) { // checks the validity of the token and parent function waits
        valid_tokens += 1; // should it be accepted then + 1
      }
    }

    return valid_tokens; // returns the valid tokens
  } catch (error) { // error handling
    console.log(error.message);
  }
}

// Sub Function for get_token()

async function check_mint(token_ID, mint_address) {
  const url_token = `https://api.ergoplatform.com/api/v0/assets/${token_ID}/issuingBox`; // api call
  let is_valid = false; // boolean for token validity

  try {
    const response = await fetch(url_token);
    if (!response.ok) {
      throw new Error('Error: Failed to retrieve data');
    }

    const data = await response.json();

    const firstEntry = data[0]; // the first parameter; in this case tokens

    //console.log(firstEntry);

    const address = firstEntry.address;

    if (mint_address === address) {
      //------------------------------------
      // Here you can customize your message
      //------------------------------------

      // Example:
      console.log("| Accepted |", firstEntry.assets[0].name, " | ", firstEntry.assets[0].tokenId, " |"); // Output: ()

      //console.log("The token is valid"); // Simple; no "boilerplay"

      is_valid = true;
    }

    else {
      console.log("|  Denied  |", firstEntry.assets[0].name);
    }

    return is_valid ? 1 : 0;
  } catch (error) {
    console.log(error.message);
  }
}

// Start of Discord Function Implementation

const mint_address = '9i27sKZ1gdZtnkbEsL1jkbnosZh3pHi9tZiwMLmi6tcwjmRQMhz'

module.exports = {
    data: new SlashCommandBuilder()
      .setName('verify-holding')
      .setDescription('displays what llamas you own to everyone for the clout'),
    async execute(interaction) {
        const userId = interaction.member.id; // Discord Member ID

        const connection = mysql.createConnection(process.env.DATABASE_URL);

        // Query the database to retrieve the user's Ergo address
        connection.query('SELECT ergoID FROM ergollamas WHERE userID = ?',[userId],
            async (error, results) => {

                if (error) {
                    console.error('Error retrieving Ergo address:', error);
                    return;
                }
  
                if (results.length === 0) {
                    console.log('User not found in the database');
                    return;
                }
  
                let user_address = results[0].ergoID;
  
                // Call the get_token function with the user's Ergo address
                const validTokens = await get_token(user_address, mint_address);

                return interaction.reply({ content: `You have ${validTokens} ErgoLlamas and the address is ${user_address}`, ephemeral: false });
            }
        );
    },
  };
