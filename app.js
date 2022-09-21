const express = require('express');

var cors = require('cors');

const bodyParser = require('body-parser')

const sequelize = require("./models/database");
const User = require("./models/user")
const Expense = require("./models/expense")
const Order = require("./models/orders")

const app = express();

const details = require('./routes/detail')
const expenseDetails = require('./routes/expenseDetail')
const purchase = require('./routes/purchase')

app.use(cors())

app.use(bodyParser.json());
app.use('/detail',details)
app.use('/expenseDetail',expenseDetails)
app.use('/purchase',purchase)


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order)
Order.belongsTo(User)

sequelize
  .sync()
  // .sync({force:true})
  .then(() => {
    app.listen(5000);
  })
  // .then(result => {
  //   return User.findByPk(1);
  // })
  // .then(result => {
  //   return expense.findByPk(1);
  // })
  // .then(user=> {
  //   return user
  // })
  .catch(err => {
    console.log(err);
  });
  