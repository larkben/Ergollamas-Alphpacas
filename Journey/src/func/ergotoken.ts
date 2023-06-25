// The functions for interacting with Ergo Tokens

import { NFTs, NFTInfo, nfts } from "../types/types" //? Consider renaming the two to avoid confusion and imply proper meaning

// Gets the URL for the ipfs location of said token
export function resolveIpfs(url: string): String {
    const ipfsPrefix = 'ipfs://';
    if (!url.startsWith(ipfsPrefix)) return url;
    else return url.replace(ipfsPrefix, 'https://cloudflare-ipfs.com/ipfs/');
}
  
// R9 -> HEX -> String
export function toUtf8String(hex:string): String {
    if(!hex){
      hex = ''
    }
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

// Fetches the token from the address and is assigned a mint address to match
export async function getToken(address: string, mintAddress: string): Promise<NFTs | undefined> {
    const url = `https://api.ergoplatform.com/api/v1/addresses/${address}/balance/confirmed`;
    let validTokens = 0;
  
    nfts.ergollamas = [];
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error: Failed to retrieve data');
      }
  
      const data = await response.json();
  
      for (const token of data.tokens) {
        const ID = token.tokenId;
        let nftData = await checkMint(ID, mintAddress);
        if (nftData && nftData.getValid()) {
          nfts.addLLama(nftData);
          validTokens += 1;
        }
      }
  
      return nfts;
    } catch (error) {
      console.log("Error Encountered");
      return undefined;
    }
}

// Inspects the token and checks the mint address as well as grabs info about the token to verify its authenticity
async function checkMint(tokenId: string, mintAddress: string): Promise<NFTInfo | undefined> {
    const urlToken = `https://api.ergoplatform.com/api/v0/assets/${tokenId}/issuingBox`;
    let isValid = false;
  
    let tokenID = "";
    let tokenName = "";
    let registry = "";
  
    try {
      const response = await fetch(urlToken);
      if (!response.ok) {
        throw new Error('Error: Failed to retrieve data');
      }
  
      const data = await response.json();
  
      const firstEntry = data[0];
  
      const address = firstEntry.address;
  
      if (mintAddress === address) {
        console.log("| Accepted |", firstEntry.assets[0].name, " | ", firstEntry.assets[0].tokenId, " |");
  
        tokenName = firstEntry.assets[0].name;
        tokenID = firstEntry.assets[0].tokenId;
        registry = firstEntry.additionalRegisters.R9;
  
        isValid = true;
      } else {
        console.log("| Denied |", firstEntry.assets[0].name);
      }
  
      let nftReturn = new NFTInfo(isValid, tokenName, tokenID, registry);
  
      return nftReturn;
    } catch (error) {
      console.log("Error Encountered");
      return undefined;
    }
}