const Expense = require('../models/expense')
const User = require('../models/user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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



exports.showExpensePremium = (req,res) => {
    Expense.findAll()
        .then(result => {
            console.log(result)
            return res.status(200).json({result, success: true})
        })
        .catch(err => {
            console.log(err)
            return res.status(403).json({success: false, message: 'did not get expense'})
        })
    }



exports.getDailyExpenses = (req, res)=>{
    //console.log(req.user.id)
    const today = new Date().setHours(0,0,0,0)
    const now = new Date()

    req.user.getExpenses
    // Expense.findAll
    ({
        where:{
            createdAt:{
                [Op.gt]: today,
                [Op.lt]: now
            }
        }
    })
    .then(result=>{
        //console.log(result)
        res.json(result)
    })
    
}


exports.getWeeklyExpenses = (req, res)=>{
    //console.log(req.user.id)
    const todayDate = new Date().getDate()
    const lastWeek  = new Date().setDate(todayDate-7)
    const now = new Date()

    // Expense.findAll
    req.user.getExpenses
    ({
        where:{
            createdAt:{
                [Op.gt]: lastWeek,
                [Op.lt]: (now)
            }
        }
    })
    .then(result=>{
        //console.log(result)
        res.json(result)
    })
}