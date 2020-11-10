import Web3 from 'web3';
import EthKidsRegistryABI from '../assets/abi/EthKidsRegistry';
import DonationCommunityABI from '../assets/abi/DonationCommunity';
import EthKidsTokenABI from '../assets/abi/EthKidsToken';
import CharityVaultABI from '../assets/abi/CharityVault';
import BondingVaultABI from '../assets/abi/BondingVault';
import YieldVaultABI from '../assets/abi/YieldVault';
import IERC20ABI from '../assets/abi/IERC20';
import IAToken from '../assets/abi/IAToken';
import KybrConverterABI from '../assets/abi/KyberConverter'

const getContract = (abi, address, web3) =>
  new Promise((resolve, reject) => {
    const contractInstance = new web3.eth.Contract(abi, address);
    if (contractInstance) {
      resolve(contractInstance);
    } else {
      reject('Can\'t get contact');
    }
  });

export const getEthKidsRegistryContract = (address, web3) => getContract(EthKidsRegistryABI, address, web3);
export const getDonationCommunityContract = (address, web3) => getContract(DonationCommunityABI, address, web3);
export const getEthKidsTokenContract = (address, web3) => getContract(EthKidsTokenABI, address, web3);
export const getCharityVaultContract = (address, web3) => getContract(CharityVaultABI, address, web3);
export const getBondingVaultContract = (address, web3) => getContract(BondingVaultABI, address, web3);
export const getYieldVaultContract = (address, web3) => getContract(YieldVaultABI, address, web3);
export const getIERC20Contract = (address, web3) => getContract(IERC20ABI, address, web3);
export const getIATokenContract = (address, web3) => getContract(IAToken, address, web3);
export const getKyberConverterContract = (address, web3) => getContract(KybrConverterABI, address, web3);
