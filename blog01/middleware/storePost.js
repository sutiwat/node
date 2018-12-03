module.exports = (req, res, next) =>{

    console.log('validateCreatePostMiddleware.')
    if(!req.files.image || !req.body.title || !req.body.subtitle || !req.body.content){
        return res.redirect('/posts/new')
    }
    
    next()
}