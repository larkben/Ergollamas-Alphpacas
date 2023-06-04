// Unlike most Ergo Docs this one will be easy.

// ${address}

//const address = relevant info
//const tokenID = relevant info

// URL API Calls

// const url = `https://api.ergoplatform.com/api/v1/networkState`;
//const url = `https://api.ergoplatform.com/api/v1/boxes/byAddress/${address}`;
//const url = `https://api.ergoplatform.com/api/v1/addresses/${address}/balance/confirmed`
//const url_token = `https://api.ergoplatform.com/api/v0/assets/${tokenID}/issuingBox`

// Getting all tokens from the address matching a specific mint address

// Return Value for Functions (not important for you to know)
class NFT_info {
  constructor(valid, nft_name, token_id) {
    this.valid = valid; // Boolean
    this.nft_name = nft_name;
    this.token_id = token_id;
  }

  display() {
    console.log(this.nft_name, " | ", this.token_id);
  }

  get_valid() {
    return this.valid
  }
} // End of Object

// Parent Object to hold NFT_info
var NFTs = {
  ergollamas: [],

  addLLama: function(llama) {
    this.ergollamas.push(llama);
  },
  getLength: function() {
    return this.ergollamas.length;
  } 
}; // End of Object

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
      let NFT_data = await check_mint(ID, mint_address);
      if (NFT_data.get_valid() == true) { // checks the validity of the token and parent function waits
        NFTs.addLLama(NFT_data);
        valid_tokens += 1; // should it be accepted then + 1
      }
    }

    return NFTs; // returns the valid tokens
  } catch (error) { // error handling
    console.log(error.message);
  }
}

// Sub Function for get_token()

async function check_mint(token_ID, mint_address) {
  const url_token = `https://api.ergoplatform.com/api/v0/assets/${token_ID}/issuingBox`; // api call
  let is_valid = false; // boolean for token validity

  let tokenID = "";
  let tokenNAME = "";

  try {
    const response = await fetch(url_token);
    if (!response.ok) {
      throw new Error('Error: Failed to retrieve data');
    }

    const data = await response.json();

    const firstEntry = data[0]; // the first parameter; in this case tokens

    //console.log(firstEntry); // debugging

    const address = firstEntry.address;

    if (mint_address === address) {
      //------------------------------------
      // Here you can customize your message
      //------------------------------------

      // Example:
      console.log("| Accepted |", firstEntry.assets[0].name, " | ", firstEntry.assets[0].tokenId, " |"); // Output: ()

      //console.log("The token is valid"); // Simple; no "boilerplay"

      tokenNAME = firstEntry.assets[0].name;
      tokenID = firstEntry.assets[0].tokenId;

      is_valid = true;
    }

    else {
      console.log("|  Denied  |", firstEntry.assets[0].name);
    }

    let NFT_return = new NFT_info(is_valid, tokenNAME, tokenID);

    return NFT_return
  } catch (error) {
    console.log(error.message);
  }
}

// Usage:
let info = get_token('9eo3TX7MXiNn9xbHTrgK21dEbQbSDpJNj9ybo3deoubzYVHkjD8', '9i27sKZ1gdZtnkbEsL1jkbnosZh3pHi9tZiwMLmi6tcwjmRQMhz')
  .then((result) => {
    console.log("The user has ", result.getLength(), " ergollamas.");
  })
  .catch((error) => {
    console.log(error);
  });
  




