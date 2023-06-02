const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql2')
require('dotenv').config()

async function get_token(address, mint_address) {
    const url = `https://api.ergoplatform.com/api/v1/addresses/${address}/balance/confirmed`;
    let valid_tokens = 0;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error: Failed to retrieve data');
      }
  
      const data = await response.json();
  
      for (const token of data.tokens) {
        const ID = token.tokenId;
        if (await check_mint(ID, mint_address) === 1) { 
          valid_tokens += 1;
        }
      }
  
      return valid_tokens;
    } catch (error) {
      console.log(error.message);
    }
}
  
// Sub Function for get_token()
  
async function check_mint(token_ID, mint_address) {
    const url_token = `https://api.ergoplatform.com/api/v0/assets/${token_ID}/issuingBox`;
    let is_valid = false;
  
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
        //console.log("The Token is Valid, ", firstEntry.assets); // Validation and Name of Token; plus any other relevant info.
  
        console.log("The token is valid"); // Simple; no "boilerplay"
        is_valid = true;
      }
  
      return is_valid ? 1 : 0;
    } catch (error) {
      console.log(error.message);
    }
}

const mint_address = '9i27sKZ1gdZtnkbEsL1jkbnosZh3pHi9tZiwMLmi6tcwjmRQMhz'

module.exports = {
    data: new SlashCommandBuilder()
      .setName('global-update')
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
