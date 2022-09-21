const Expense = require('../models/expense')

exports.expense = (req,res) => {
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    // const userId = req.body.id

    // Expense.create
    req.user.createExpense({
        amount: amount,
        description: description,
        category: category
        // userId: req.user.id
    })
    .then(result => {
        console.log(result)
        return res.status(200).json({success:true, message:'expense created'})
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({success:false, message: 'something is wrong'})
    })
}

exports.getexpense = (req,res) => {
    // Expense.findAll()
    req.user.getExpenses()
        .then(result => {
            console.log(result)
            return res.status(201).json({result, success: true, user: req.user})
        })
        .catch(err => {
            console.log(err)
            return res.status(403).json({success: false, message: 'did not get expense'})
        })
    }


exports.deleteexpense = (req,res) => {
    const id = req.params.id;
    // if(id === undefined || id.length === 0){
    //     res.status(400).json({success:false,message:'nope'})
    // }
    Expense.destroy({where: { id: id }}).then(result => {
        console.log(result)
        return res.status(204).json({ success: true, message: "Expense Deleted"})
    }).catch(err => {
        console.log(err);
        return res.status(400).json({ success: false, message: "Expense not deleted"})
    })
}