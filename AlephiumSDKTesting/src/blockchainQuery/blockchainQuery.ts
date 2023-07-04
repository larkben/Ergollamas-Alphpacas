// 

import { NodeProvider } from "@alephium/web3";

const API_KEY = "6d7412ea402de16a061f0028595e9208ccc38914f2352328e1fbea7e7f8e5c35";
const nodeProvider = new NodeProvider('http://127.0.0.1:12973', API_KEY);

async function getBlockHeight() {
    const result = await nodeProvider.blockflow.getBlockflowChainInfo({
        fromGroup: 0,
        toGroup: 0
    })
    console.log(result);
}

