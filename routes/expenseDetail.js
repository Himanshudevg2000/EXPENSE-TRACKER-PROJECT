const express = require('express');

const expensecontroller = require('../controllers/expensedetail')

const authenticationmiddleware = require('../middleware/authorization');

const router = express.Router();

router.post('/expense',authenticationmiddleware.authenticate, expensecontroller.expense)

router.get('/getexpense',authenticationmiddleware.authenticate, expensecontroller.getexpense)

// router.get('/getallusers', expensecontroller.showExpensePremium)

// router.get('/getallexpense/;id', expensecontroller.seeExpensePremium)

router.delete('/deleteexpense/:id',authenticationmiddleware.authenticate, expensecontroller.deleteexpense)

module.exports = router;