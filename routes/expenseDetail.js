const express = require('express');

const expensecontroller = require('../controllers/expensedetail')

const router = express.Router();

router.post('/expense', expensecontroller.expense)

router.get('/getexpense', expensecontroller.getexpense)

router.delete('/deleteexpense/:id', expensecontroller.deleteexpense)

module.exports = router;