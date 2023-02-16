var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
function Token(data) {
    return  'Bearer ' + jwt.sign(
        JSON.parse(JSON.stringify(data)),
        'secret000',
        {
            expiresIn: 60 * 5
        }
    )
}

var login = new Schema({
    username: String,
    password: String,
    profile:String,
    gamertag:String,
    firstname:String,
    lastname:String,
    Gamename:String,
    whatever:String,
    phone:String,
    binary:Date,
});
var Login = mongoose.model('user', login);
// let data = {
//     username: 'admin',
//     password: '123456',
//     profile:'hello !',
//     gamertag:'0001',
//     firstname:'Elvis',
//     lastname:'YTeng',
//     Gamename:'Toronto1',
//     whatever:'410000',
//     phone:'123456789',
//     binary:'2019-10-10',
// }
// let login1 = new Login(data)
// login1.save(function (error, result) {
//     console.log(error)
//     console.log(result)
// })
// register or login
router.post('/login', async function (req, res) {
    let info = req.body;
    //username password is not null
    if (info.username === '' || info.password === '') {
        res.json({
            status: 'error',
            msg: 'username or password cannot be null'
        })
        return
    }
    //check username
    let isUser = await Login.find({username: info.username}).catch((err) => {
        console.log(err)
    })
    if (isUser.length === 0) {
        let login1 = new Login({
            username: info.username,
            password: info.password
        })
        let data = await login1.save().catch((err) => {
            console.log(err)
        })
        const token = Token(data)
        res.json({
            status: 'create ok',
            data: {token: token}
        })
    }else {
       //check password
        if (isUser[0].password === info.password) {
            const token = Token(isUser[0])
            res.json({
                status: 'login ok',
                data: {token: token}
            })
        }else {
            res.json({
                status: 'error',
                msg: 'wrong password'
            })
        }
    }

})
router.get('/user', function (req, res) {
    Login.find({}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                status: 'ok',
                data: data,
                tokeninfo: req.auth
            })
        }
    })
})
//create new activity
router.post('/createActivity', function (req, res) {
    let info = req.body

})

module.exports = router;
