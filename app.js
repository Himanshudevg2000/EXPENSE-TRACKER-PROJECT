const express = require('express');

var cors = require('cors');

const bodyParser = require('body-parser')

const sequelize = require("./models/database");
const User = require("./models/user")
const Expense = require("./models/expense")
const Order = require("./models/orders")
const Forgotpassword = require('./models/forgotpassword')

const app = express();

const details = require('./routes/detail')
const expenseDetails = require('./routes/expenseDetail')
const purchase = require('./routes/purchase')
const resetpassword = require('./routes/resetpassword')

app.use(cors())

app.use(bodyParser.json());
app.use('/detail',details)
app.use('/expenseDetail',expenseDetails)
app.use('/purchase',purchase)
app.use('/password', resetpassword)


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Forgotpassword)
Forgotpassword.belongsTo(User)

sequelize
  .sync()
  // .sync({force:true})
  .then(() => {
    app.listen(5000);
  })

  .catch(err => {
    console.log(err);
  });
  