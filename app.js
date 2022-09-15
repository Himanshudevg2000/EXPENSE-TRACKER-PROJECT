const express = require('express');

var cors = require('cors');

const bodyParser = require('body-parser')

const sequelize = require("./models/database");
const User = require("./models/user")

const app = express();

const details = require('./routes/detail')

app.use(cors())

app.use(bodyParser.json());
app.use('/detail',details)


sequelize
  .sync()
  // .sync({force:true})
  .then(() => {
    app.listen(5000);
  })
  .then(result => {
    return User.findByPk(1);
  })
  .then(user=> {
    return user
  })
  .catch(err => {
    console.log(err);
  });
  