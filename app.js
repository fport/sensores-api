const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

// Create express app
const app = express()

// Logging system
const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/logs.log'), {
  flags: 'a'
})
app.use(morgan('dev', { stream: accessLogStream }))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

// Import dotenv
require('dotenv').config()

const corsOptions = {
  //To allow requests from client
  origin: ['http://localhost:3000', 'http://127.0.0.1', 'https://sensores-61r4s1l09-furkanportakal.vercel.app'],
  credentials: true,
  withCredentials: true
}

// Cors options
app.use(cors(corsOptions))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  )
  next()
})

// define a root route
app.get('/', (req, res) => {
  res.send('This Backend Is Working...')
})

// define a api route
app.get('/api', (req, res) => {
  res.json({
    isAuth: true,
    massage: 'this app is working...'
  })
})

// User Router
const appRouter = require('./src/routers/app.router')

// using as middleware

// User api
app.use('/api', appRouter)

// Exporting
module.exports = app
