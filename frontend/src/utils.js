import Web3 from 'web3'
import { NFTStorage } from 'nft.storage'
import CryptoPosts from './contracts/CryptoPosts.json'

const client = new NFTStorage({
  token: process.env.REACT_APP_NFTSTORAGE_API_KEY,
})

const endpoint = process.env.REACT_APP_MUMBAI_ENDPOINT

const networkNumber = 80001

const getWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum)
    try {
      await window.ethereum.enable()
      const networkId = await web3.eth.net.getId()
      if (networkId === networkNumber) {
        return web3
      } else {
        const endpointWeb3 = new Web3(new Web3.providers.HttpProvider(endpoint))
        return endpointWeb3
      }
    } catch (error) {
      const endpointWeb3 = new Web3(new Web3.providers.HttpProvider(endpoint))
      return endpointWeb3
    }
  } else if (window.web3) {
    const networkId = await window.web3.eth.net.getId()
    if (networkId === networkNumber) {
      return window.web3
    } else {
      const endpointWeb3 = new Web3(new Web3.providers.HttpProvider(endpoint))
      return endpointWeb3
    }
  } else {
    const endpointWeb3 = new Web3(new Web3.providers.HttpProvider(endpoint))
    return endpointWeb3
  }
}

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId()
  const contractDeployment = CryptoPosts.networks[networkId]
  return new web3.eth.Contract(
    CryptoPosts.abi,
    contractDeployment && contractDeployment.address
  )
}

const getContractAddress = async (web3) => {
  const networkId = await web3.eth.net.getId()
  const contractDeployment = CryptoPosts.networks[networkId]
  return contractDeployment.address
}

export { getContractAddress, getContract, getWeb3, client }
