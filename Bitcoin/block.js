const sha256 = require('sha256')

//block class
class Block {
    constructor(timestamp, transactions, prevHash) {
        this.timestamp = timestamp.toLocaleString();
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.currHash = this.createHash();
        this.nonce = 0;
    }

    createHash = () => (sha256(this.timestamp + JSON.stringify(this.data) + this.nonce).toString())

    blockMiner(difficulty) {
        while (this.currHash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.currHash = this.createHash();
        }
        console.log('spelunked ' + this.currHash);
    }

}

module.exports = Block