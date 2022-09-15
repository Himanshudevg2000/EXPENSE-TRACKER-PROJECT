const User = require('../models/user')

exports.signup = (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User.create({
        name: name,
        email: email,
        password: password
    })
    .then(result=> {
        console.log(result)
        res.status(200).json({success: true, result})
    })

    .catch(err=> {
        res.json({err})
    })
}

exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    
}
