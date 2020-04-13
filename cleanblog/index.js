const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const ejs = require('ejs')

const app = new express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
mongoose.connect('mongodb+srv://gshir326:123456-@cluster0-w5zfz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

//Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())


//Custom test middleware
//Validates all fields of post are filled
const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.title == null) {
        return res.redirect('/post/new')
    }
    next()
}
app.use('/posts/store', validateMiddleWare)


//BlogPost Model
const BlogPost = require('./models/BlogPost.js')

//for heroku deployment
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('App listening on port 4000')
})


//Main Page
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

//About Page
app.get('/about', async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    const blogposts = await BlogPost.find({})
    res.render('about', {
        blogposts
    });
})

//Contact Page
app.get('/contact', async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    const blogposts = await BlogPost.find({})
    res.render('contact', {
        blogposts
    });
})

//Post Page
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    });

})
//new post page
app.get('/posts/new', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('create');
})

//create post
app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
})




