import { NodeProvider, web3 } from "@alephium/web3";

const nodeProvider = new NodeProvider('http://127.0.0.1:12973/')

async function getBlockflowChainInfo() {
  const result = await nodeProvider.blockflow.getBlockflowChainInfo({
    fromGroup: 0,
    toGroup: 0
  });
  console.log(result);
}
getBlockflowChainInfo();

