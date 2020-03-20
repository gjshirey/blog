
const express = require('express')
const path = require('path')
const app = express() //call express function to start new Express app
app.use(express.static('public'))

app.listen(3000, () => { //Listen on port 3000
    console.log("App listening on port 3000")
})

app.get('/', (req,res)=>{ // localhost:3000/ is index.html
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/about', (req,res)=>{ // localhost:3000/about is about.html
    res.sendFile(path.resolve(__dirname, 'about.html'))
})

app.get('/contact', (req,res)=>{ // localhost:3000/contact is contact.html
    res.sendFile(path.resolve(__dirname, 'contact.html'))
})