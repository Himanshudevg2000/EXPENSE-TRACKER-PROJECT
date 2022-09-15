const User = require('../models/user')

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

    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(404).json({success: false, message:'emailid or password is missing'})
    }

    User.findAll({where : {email,password}})
        .then(response => {
            if(response.length > 0){
                if(response[0].password === password) {
                    res.status(200).json({success:true, message:'login Successfully'})
                }else{
                    return res.status(400).json({success: false, message:'password is incorrect'})
                }
            }else{
                return res.status(404).json({success: false, message: 'User does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({success:false,message: err})
        })
}
