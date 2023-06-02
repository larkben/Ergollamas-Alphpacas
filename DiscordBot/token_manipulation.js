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

export async function get_token(address, mint_address) {
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

// Usage:
get_token('9eo3TX7MXiNn9xbHTrgK21dEbQbSDpJNj9ybo3deoubzYVHkjD8', '9i27sKZ1gdZtnkbEsL1jkbnosZh3pHi9tZiwMLmi6tcwjmRQMhz')
  .then(validTokens => {
    console.log("This user has", validTokens, "valid tokens");
  });




