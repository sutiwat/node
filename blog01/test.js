const mongoose = require('mongoose');

const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/node-js-test-blog',{ useNewUrlParser: true });

// Post.findByIdAndUpdate("5bbf76418698fb1f14847378",{
//     title: 'My first post update by id'
// }, (error, post) =>{
//     console.log(error, post);
// });



// Post.findById("5bbf76418698fb1f14847378", (error,post) =>{
//     console.log(error, post);
// });

Post.find({},(error, posts) =>{
    console.log(error, posts);
});


// Post.create({
//     title:'My second blog post',
//     description: 'Blog post description',
//     content:'second Lorem ipsum content'
// }, (error, post) => {
//     console.log(error, post);
// });