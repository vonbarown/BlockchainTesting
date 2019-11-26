
let Block = require('./block.js');
let Transactions = require('./transactions.js')

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

    //function to mine the pending transactions and ignoring forced miners choice
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
    addingTrans = (trans) => {
        //check if transaction info is filled in
        if (!trans.sender || !trans.recipient) {
            throw new Error('Transaction must be filled out, sender and recipient');
        }
        if (!trans.checkValidity()) {
            throw new Error('cannot  add invalid transaction  to chain');
        }

        this.pendingTrans.push(trans)
    };

    //returns your balance after mining a pending transaction
    returnBalanceOfAddress = (address) => {
        let balance = 100;

        //can be improved
        for (const blocks of this.chain) {
            for (const trans of blocks.transactions) {
                if (trans.sender === address) {
                    balance -= trans.amount
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

            //verify if all trans in current block is valid
            if (!currBlock.hasValidTrans()) {
                return false
            } else if (currBlock.currHash !== currBlock.createHash()) {
                //check if the current block hash matches the hash created by the method
                return false;
            } else if (currBlock.prevHash !== prevBlock.currHash) {
                //ensuring that the the current block points to the previous block hash code
                return false;
            }

            return true;
        }
    }
}

module.exports = Blockchain;


