const express = require('express');

const purchaseController = require('../controllers/purchase');

const authenticationmiddleware = require('../middleware/authorization');

const router = express.Router();

router.get('/premiummembership', authenticationmiddleware.authenticate,purchaseController.purchasepremium);

router.post('/updatetransactionstatus', authenticationmiddleware.authenticate, purchaseController.updateTransactionStatus)

module.exports = router;