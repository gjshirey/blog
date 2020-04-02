const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = new express()
const ejs = require('ejs')

app.set('view engine', 'ejs')
app.use(express.static('public'))
mongoose.connect('mongodb+srv://gshir326:123456-@cluster0-w5zfz.mongodb.net/test?retryWrites=true&w=majority')

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index');
})
app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about');
})
app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact');
})
app.get('/post', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('post');
})
app.get('/post/new', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('create');
})