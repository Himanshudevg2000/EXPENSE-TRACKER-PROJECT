const express = require('express');

const expensecontroller = require('../controllers/expensedetail')

const authenticationmiddleware = require('../middleware/authorization');

const router = express.Router();

router.post('/expense',authenticationmiddleware.authenticate, expensecontroller.expense)

router.get('/getexpense',authenticationmiddleware.authenticate, expensecontroller.getexpense)

router.get('/getallexpenses', expensecontroller.showExpensePremium)

router.delete('/deleteexpense/:id',authenticationmiddleware.authenticate, expensecontroller.deleteexpense)

router.get('/getDailyExpenses', authenticationmiddleware.authenticate, expensecontroller.getDailyExpenses)

router.get('/getWeeklyExpenses', authenticationmiddleware.authenticate, expensecontroller.getWeeklyExpenses)

module.exports = router;