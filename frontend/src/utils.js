import Web3 from 'web3';
import { NFTStorage } from 'nft.storage';
import Prompts from './contracts/Prompts.json';

const client = new NFTStorage({ token: process.env.REACT_APP_NFTSTORAGE_API_KEY });

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
        resolve(web3);
      } else if(window.web3) {
        resolve(window.web3);
      } else {
        console.log("before");
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ENDPOINT));
        console.log("after");
        console.log(web3);
        resolve(web3);
      }
    });
  });
};

const getContract = async web3 => {
  const networkId = await web3.eth.net.getId();
  console.log(`networkId: ${networkId}`);
  const contractDeployment = Prompts.networks[networkId];
  return new web3.eth.Contract(
    Prompts.abi,
    contractDeployment && contractDeployment.address
  );
};

export { getContract, getWeb3, client };