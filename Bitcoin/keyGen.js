const EC = require('elliptic').ec
const ec = new EC('secp256k1');

//retrieving public and private keys.
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex')


console.log('--------');
console.log('private key', privateKey);

console.log('--------');
console.log('public key', publicKey);



