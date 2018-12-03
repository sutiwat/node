const express = require('express');
const expressEdge = require('express-edge')

const app = express()

app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.get('/',(req, res) =>{
    res.render('index')
})

app.listen(8080, ()=>{
    console.log('Start node.js on port 8080')
})