let Blockchain = require('./Bitcoin/blockChain.js');
let Transactions = require('./Bitcoin/transactions');



let vonbarcoin = new Blockchain();

vonbarcoin.createTrans(new Transactions('sender1', 'sender2', 200))
vonbarcoin.createTrans(new Transactions('sender2', 'sender1', 90));

console.log('mining start');
vonbarcoin.minePendingTrans('von-address');


console.log('balance  ', vonbarcoin.returnBalanceOfAddress('von-address'));

console.log('mining start');
vonbarcoin.minePendingTrans('von-address');

console.log('balance  ', vonbarcoin.returnBalanceOfAddress('von-address'));
