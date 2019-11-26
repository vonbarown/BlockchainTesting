const EC = require('elliptic').ec
const ec = new EC('secp256k1');
const sha256 = require('sha256')


// class object that holds the information about the transaction
class Transactions {
    constructor(sender, recipient, amount) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
    }

    //the hash of transaction that will be signed by keys
    calcHash = () => (sha256(this.sender + this.recipient + this.amount).toString());

    //signing transaction
    signTrans = (keyPairs) => {
        //ensures that you can't sign transactions that are not your own
        if (keyPairs.getPublic('hex') !== this.sender) {
            throw new Error('You lack sufficient privileges');
        }

        const transHash = this.calcHash();
        const sig = keyPairs.sign(transHash, 'base64');
        this.signature = sig.toDER('hex')
    }

    checkValidity = () => {
        //assumption that transaction is valid
        if (this.sender === null) return true;

        //if there is a sender, checking if trans has a signature
        if (!this.signature || this.signature.length === 0) {
            throw new Error('Transaction is not signed')
        }

        //new public key from the sender address
        const publicKey = ec.keyFromPublic(this.sender, 'hex')
        //verify if the hash was signed
        return publicKey.verify(this.calcHash(), this.signature)
    }

}

module.exports = Transactions;