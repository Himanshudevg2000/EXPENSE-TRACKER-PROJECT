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

    User.findAll({where : {email,password}})
        .then(response => {
            if(response) {
            res.status(200).json({success:true, message:'login Successfully'})
            }else{
                throw new Error('user doesnt exist')
            }
        })
        .catch(err => {
            res.status(500).json({success:false,message: 'Somthing is wrong'})
        })
}
