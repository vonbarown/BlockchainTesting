const sha256 = require('sha256')


class Block {
    constructor(index, timestamp, data, prevHash) {
        this.index = index;
        this.timestamp = timestamp.toLocaleString();
        this.data = data;
        this.prevHash = prevHash;
        this.currHash = this.createHash();
    }

    createHash = () => (sha256(this.index + this.timestamp + JSON.stringify(this.data)).toString())
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    //creating the genesis block
    createGenesisBlock = () => new Block(0, new Date().toLocaleString(), 'Genesis Block', '0');

    //returning the latest block
    latestBlock = () => this.chain[this.chain.length - 1];

    //adding new block to the chain
    addBlock = (newBlock) => {
        newBlock.prevHash = this.latestBlock().currHash;
        newBlock.currHash = newBlock.createHash();
        this.chain.push(newBlock);
    }

    //verify that the chain has not been tampered with
    verifyChain = () => {
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currBlock.currHash !== currBlock.createHash()) {
                return false;
            }
            if (currBlock.prevHash !== prevBlock.currHash) {
                return false;
            }

            return true;

        }
    }
}

let vonbarcoin = new Blockchain();
vonbarcoin.addBlock(new Block(1, new Date(), { amount: 6 }));
vonbarcoin.addBlock(new Block(2, new Date(), { amount: 20 }));

console.log(vonbarcoin.verifyChain());

vonbarcoin.chain[1].data = { amount: 200 }

console.log(vonbarcoin.verifyChain());

// console.log(JSON.stringify(vonbarcoin, null, 4));
