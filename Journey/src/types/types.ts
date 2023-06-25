// Here you will find all data structure implmentations

import { resolveIpfs, toUtf8String } from "../func/ergotoken";

// Return Value for NFTInfo (not important for you to know); if you need access to certain instances of the token these functions within this class will do it
export class NFTInfo {
    private valid: boolean;
    private nftName: string;
    private tokenId: string;
    private r9: string; // Ergo Specific otherwise "null"
  
    constructor(valid: boolean, nftName: string, tokenId: string, r9: string) {
      this.valid = valid;
      this.nftName = nftName;
      this.tokenId = tokenId;
      this.r9 = r9;
    }
  
    /**
     * 
     * @returns nftName (string)
     */
    getName(): string {
      return this.nftName;
    }
  
    /**
     * 
     * @returns valid (boolean)
     */
    getValid(): boolean {
      return this.valid;
    }
  
    /**
     * 
     * @returns tokenId (string)
     */
    getTokenID(): string {
      return this.tokenId;
    }
  
    /**
     * 
     * @returns r9 (string) (Ergo) ~ r9 is the Ergo Register to get the "ipfs" link to the nft image or token
     */
    getR9(): string {
      return this.r9;
    }
  
    /**
     * 
     * @returns (Ergo) returns a String to the ipfs image link
     */
    getImageLink(): String {
      let link = resolveIpfs(toUtf8String(this.r9).substring(2));
      return link;
    }
}

export interface NFTs {
    ergollamas: NFTInfo[];
  
    addLLama(llama: NFTInfo): void;
    getLength(): number;
}
  
export const nfts: NFTs = {
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