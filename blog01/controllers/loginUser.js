const bcrypt = require('bcryptjs')

const User = require('../database/models/User');

module.exports = (req, res) => {

    const { email, password} = req.body
    console.log('user login')
    //try to find the user
    User.findOne({email}, (error, user) =>{
        console.log('find user')
        
        if(user){
            //compare password
            bcrypt.compare(password, user.password, (error, result) =>{
                 // if usesr password is correct , then, login user
                if(result){
                    console.log('user login ' + user.email )
                    req.session.userId = user._id
                    // store user session
                    res.redirect('/')
                }else{
                    res.redirect('/auth/login')
                }
            })
        }else{
            // else
            console.log('user not found')
            return res.redirect('/auth/login')
        }
    })

}