let Blockchain = require('./Bitcoin/blockChain.js');
let Transaction = require('./Bitcoin/transactions');

const EC = require('elliptic').ec
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate('42e70e8532f2ae99e7c365ef20ff6d5df589ca3ba93380ac6c5a4275ecf494ff');
const myWalletAddress = myKey.getPublic('hex');


let publicKey = '04a1fe4b50f9d11f834abf5a41fe118d6ed9f2e7006526fe0dfee596ac483abce93c61e68a99b8d236843e1b37fc8fe96d5b14f6311212f055c85a86ddb025a334'
let vonbarcoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key', 10)
tx1.signTrans(myKey);
vonbarcoin.addingTrans(tx1);



// vonbarcoin.addingTrans(new Transaction('sender1', 'sender2', 200))
// vonbarcoin.addingTrans(new Transaction('sender2', 'sender1', 90));

console.log('mining start');
vonbarcoin.minePendingTrans(myWalletAddress);


console.log('balance  ', vonbarcoin.returnBalanceOfAddress(myWalletAddress));
