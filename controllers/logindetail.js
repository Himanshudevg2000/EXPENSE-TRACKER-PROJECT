const User = require('../models/user')
const bcrypt = require('bcrypt');

function isstringinvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

exports.signup = (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(password,saltRounds, (err,hash) => {
        console.log(err)
        User.create({
            name: name,
            email: email,
            password: hash
        })
        .then(result=> {
            console.log(result)
            res.status(200).json({success: true, result})
        })
        
        .catch(err=> {
            res.status(500).json({err})
        })
    })
}

exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(404).json({success: false, message:'emailid or password is missing'})
    }

    User.findAll({where : {email}})
        .then(response => {
            if(response.length > 0){
                bcrypt.compare(password,response[0].password, (err,result) => {
                    if(err){
                        return res.json({success:true, message:'Something Wrong'})
                    }
                    if(result === true) {
                        res.status(200).json({success:true, message:'login Successfully'})
                    }else{
                        return res.status(400).json({success: false, message:'password is incorrect'})
                    }
                })
            }else{
                return res.status(404).json({success: false, message: 'User does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({success:false,message: err})
        })
}
