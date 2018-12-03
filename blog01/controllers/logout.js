module.exports = (req, res) =>{
    console.log('logout')
    
    req.session.destroy(() =>{
        res.redirect('/')
    })
}