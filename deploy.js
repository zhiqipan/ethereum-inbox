const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface: abi, bytecode } = require('./compile');

// rinkebyAddress is the address of Infura rinkeby network endpoint, use Infura so we don't have to host node on our local machine (which is expensive)
// mnemonic gives information of our accounts (public key and private key) so web3 can take control of our account
const { mnemonic, rinkebyAddress } = require('./config/config');
const provider = new HDWalletProvider(mnemonic, rinkebyAddress);
const eth = new Web3(provider).eth;

async function deploy() {
  console.info('Retrieving accounts');
  const accounts = await eth.getAccounts();
  console.info('Attempting to deploy from account', accounts[0]);
  const result = await new eth.Contract(JSON.parse(abi))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: 1000000, from: accounts[0] });
  console.info('Contract deployed to', result.options.address);
  console.info('More information:', `https://rinkeby.etherscan.io/address/${result.options.address}`);
}

deploy().catch(e => {
  console.error('Failed to deploy\n' + e);
});
