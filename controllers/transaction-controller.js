const { Transaction, TransactionDetail } = require('../models/index');

class TransactionController {
    static async getTransactionRootHandler(req, res ,next) {
        const userId = req.loggedInUser.id
    }

    static async postTransactionRootHandler(req, res, next) {

    }
}

module.exports = TransactionController;