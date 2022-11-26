const express = require('express')
const app = express()
require('dotenv').config()
require('./src/config/dbConnection')



app.set("view engine", "pug")
app.set("views", "./src/views")


const homepage = require('./src/router/homepage')


app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', homepage)

app.use(express.static(__dirname + '/src/public'));
app.use(express.static(__dirname + '/src/views'));
app.use(express.static("."));





const port = process.env.PORT || 5001


app.listen(port, () => {
    console.log(`Server ${port} portundan çalışıyor `)
})