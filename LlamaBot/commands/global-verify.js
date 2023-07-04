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
      .setName('global-verify')
      .setDescription('Updates all users and their llama ownership and holdings'),
    async execute(interaction) {
      const connection = mysql.createConnection(process.env.DATABASE_URL);
  
      const selectSql = 'SELECT * FROM ergollamas';
  
      connection.query(selectSql, function (error, results, fields) {
        if (error) throw error;
  
        // Loop through the results and perform actions for each user
        results.forEach(async (user) => {
          // Access user properties using user.userID, user.ergoID, etc.
  
          let number_llamas = await get_token(user.ergoID, mint_address); // (Address, Mint_Address)
          if (number_llamas !== null) {
            let sql = `UPDATE ergollamas SET llamas=${number_llamas} WHERE userID='${user.userID}'`;
  
            connection.query(sql, function (error, results, fields) {
              if (error) throw error;
  
              console.log(user.userID, 'llamas updated to', number_llamas);
            });
          }
        });
      });
  
      return interaction.reply({ content: 'Global Update has been Called', ephemeral: true });
    },
  };
