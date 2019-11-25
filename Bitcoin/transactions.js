// class object that holds the information about the transaction
class Transactions {
    constructor(sender, recipient, amount) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
    }
}

module.exports = Transactions;