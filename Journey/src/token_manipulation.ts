// Unlike most Ergo Docs this one will be easy.

import { link } from "fs";

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
export class NFTInfo {
  private valid: boolean;
  private nftName: string;
  private tokenId: string;
  private r9: string;

  constructor(valid: boolean, nftName: string, tokenId: string, r9: string) {
    this.valid = valid;
    this.nftName = nftName;
    this.tokenId = tokenId;
    this.r9 = r9;
  }

  getName(): string {
    return this.nftName;
  }

  getValid(): boolean {
    return this.valid;
  }

  getTokenID(): string {
    return this.tokenId;
  }

  getR9(): string {
    return this.r9;
  }

  getImageLink(): String {
    let link = resolveIpfs(toUtf8String(this.r9).substring(2));
    return link;
  }
}

interface NFTs {
  ergollamas: NFTInfo[];

  addLLama(llama: NFTInfo): void;
  getLength(): number;
}

const nfts: NFTs = {
  ergollamas: [],

  addLLama(llama: NFTInfo): void {
    // Check if the llama already exists in the array
    const existingLlama = this.ergollamas.find(
      (existingLlama) => existingLlama.getTokenID() === llama.getTokenID()
    );

    if (!existingLlama) {
      this.ergollamas.push(llama);
    }
  },

  getLength(): number {
    return this.ergollamas.length;
  },
};

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

// 
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

