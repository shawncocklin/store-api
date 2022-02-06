/* 
  REFERENCES AND IMPORTS
*/
const PORT = process.env.PORT || 5000
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const {connectDB} = require('./db/connect')
const productRouter = require('./routes/products')


const app = express()

/* 
  MIDDLEWARE
*/
// allow access to url params
app.use(express.urlencoded({extended: false}))
// allow access to json parser for APIs
app.use(express.json())

/* 
  ROUTES
*/
app.get('/', (req,res)=> {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Producst Route</a>`)
})

app.use('/api/v1/products', productRouter)

// error handling middleware for invalid routes
app.use(notFound)
app._router.use(errorHandler)

/* 
  LOGIC
*/

async function start() {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, ()=> console.log(`server listening on port ${PORT}...`))
  } catch(err) {
    console.log(err)
  }
}

start()