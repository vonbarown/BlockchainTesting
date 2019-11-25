const sha256 = require('sha256');

class Block {
    constructor(index, timestamp, data, prevHash) {
        this.index = index;
        this.timestamp = timestamp.toLocaleString();
        this.data = data;
        this.trans
        this.prevHash = prevHash;
        this.thisHash = sha256(
            this.index + this.timestamp + this.data + this.prevHash
        );
        this.nonce = 0;
    }


    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}

const createGenesisBlock = () => new Block(0, new Date(), 'Genesis Block', '0');

const nextBlock = (lastBlock, data) => new Block(lastBlock.index + 1, new Date(), data, lastBlock.thisHash);