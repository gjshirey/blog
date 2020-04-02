const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb+srv://gshir326:123456-@cluster0-w5zfz.mongodb.net/test?retryWrites=true&w=majority')

BlogPost.create({
    title: 'This is a test blog post',
    body: 'This is the body of the test blog post'
}, (error, blogpost) => {
    console.log(error, blogpost)
})