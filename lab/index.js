
const express = require('express')
const path = require('path')

const app = express() //call express function to start new Express app
app.listen(3000, () => {
    console.log("App listening on port 3000")
})

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/about', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'about.html'))
})

app.get('/contact', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'contact.html'))
})