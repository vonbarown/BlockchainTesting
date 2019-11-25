const sha256 = require('sha256')

class Transactions {
    constructor(sender, recipient, amount) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
    }
}


//block class
class Block {
    constructor(timestamp, transactions, prevHash) {
        this.timestamp = timestamp.toLocaleString();
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.currHash = this.createHash();
        this.nonce = 0;
    }

    createHash = () => (sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.nonce).toString())

    blockMiner(difficulty) {
        while (this.currHash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.currHash = this.createHash();
        }
        console.log('spelunked ' + this.currHash);
    }

}

//blockchain class
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTrans = [];
        this.mineReward = 150;
    }

    //creating the genesis block
    createGenesisBlock = () => new Block(new Date().toLocaleString(), 'Genesis Block', '0');

    //returning the latest block
    latestBlock = () => this.chain[this.chain.length - 1];

    //function to mine the pending transactions
    //ignoring forced miners choice
    minePendingTrans = (miningRewardAddress) => {
        let block = new Block(new Date(), this.pendingTrans);

        //ensuring that there is proof of work
        block.blockMiner(this.difficulty)
        console.log("block mining it's business");
        //adding block to the chain
        this.chain.push(block);

        //resetting pending trans array and giving miner their reward
        this.pendingTrans = [new Transactions(null, miningRewardAddress, this.mineReward)]
    }

    //creating new transactions and push them to the pending trans array
    createTrans = (trans) => this.pendingTrans.push(trans);

    //returns your balance after mining a pending transaction
    returnBalanceOfAddress = (address) => {
        let balance = 0;

        //can be improved
        for (const blocks of this.chain) {
            for (const trans of blocks.transactions) {
                if (trans.sender === address) {
                    balance - + trans.amount
                } else if (trans.recipient === address) {
                    balance += trans.amount
                }
            }
        }
        return balance;
    }

    //verify that the chain has not been tampered with
    verifyChain = () => {
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            //check if the current block hash matches the hash created by the method
            if (currBlock.currHash !== currBlock.createHash()) {
                return false;
            } else if (currBlock.prevHash !== prevBlock.currHash) {
                //ensuring that the the current block points to the previous block hash code
                return false;
            }

            return true;
        }
    }
}

let vonbarcoin = new Blockchain();

vonbarcoin.createTrans(new Transactions('sender1', 'sender2', 200))
vonbarcoin.createTrans(new Transactions('sender2', 'sender1', 90));

console.log('mining start');
vonbarcoin.minePendingTrans('von-address');

console.log('balance  ', vonbarcoin.returnBalanceOfAddress('von-address'));

console.log('mining start');
vonbarcoin.minePendingTrans('von-address');

console.log('balance  ', vonbarcoin.returnBalanceOfAddress('von-address'));



