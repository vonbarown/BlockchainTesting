let Blockchain = require('./Bitcoin/blockChain.js');
let Transaction = require('./Bitcoin/transactions');

const EC = require('elliptic').ec
const ec = new EC('secp256k1');

const { publicKey, privateKey } = require('./Bitcoin/keyGen')


const myKey = ec.keyFromPrivate(privateKey);
const myWalletAddress = myKey.getPublic('hex');

console.log('this is index privKey', privateKey);


let vonbarcoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, publicKey, 10)
tx1.signTrans(myKey);
vonbarcoin.addingTrans(tx1);



// vonbarcoin.addingTrans(new Transaction('sender1', 'sender2', 200))
// vonbarcoin.addingTrans(new Transaction('sender2', 'sender1', 90));

console.log('mining start');
vonbarcoin.minePendingTrans(myWalletAddress);


console.log('balance  ', vonbarcoin.returnBalanceOfAddress(myWalletAddress));
