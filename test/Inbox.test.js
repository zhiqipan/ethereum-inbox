const ganache = require('ganache-cli');
const Web3 = require('web3');
const eth = new Web3(ganache.provider()).eth;
const { interface: abi, bytecode } = require('../compile');

/*
web3 in Ethereum can:
  1. interact with deployed contracts (with ABI and the address of deployed contract)
  2. create a new contract (with ABI and bytecode)
*/

const INIT_MESSAGE = 'Hi there!';

let accounts;
let inbox;
beforeEach(async () => {
  accounts = await eth.getAccounts();
  inbox = await new eth.Contract(JSON.parse(abi)) // teaches web3 what methods the contract has
    .deploy({ data: bytecode, arguments: [INIT_MESSAGE] }) // tells web3 that we want to deploy a new copy of this contract (creates a transaction object)
    .send({ from: accounts[0], gas: '1000000' }); // instructs web3 to send out a transaction that creates this contract
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    expect(inbox.options.address).toBeDefined();
  });

  it('has a default message', async (done) => {
    const message = await inbox.methods
      .message() // tells web3 that we want to call message method with no parameters (creates a transaction object)
      .call(); // instructs web3 to send out the transaction object (this is done asynchronously)
               // arguments of call() would be who is paying for the transaction (where the tx is from), how much gas to use, and etc.
    expect(message).toBe(INIT_MESSAGE);
    done();
  });

  it('updates the message', async (done) => {
    const newMessage = 'Bye';
    const result = await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    expect(result.transactionHash).toBeDefined();
    const message = await inbox.methods.message().call();
    expect(message).toBe(newMessage);
    done();
  });
});
