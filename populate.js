require('dotenv').config()
const {connectDB} = require('./db/connect')

const Product = require('./models/products')
const jsonProducts = require('./products.json')

async function start() {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URI)
    // if no args passed in, deletes the existing database entirely
    await Product.deleteMany()
    // pass in the products list as a json object to repopulate the database
    await Product.create(jsonProducts)
    console.log('db populated')
    // exits from the database and moves on to other middleware
    process.exit(0)
  } catch(err) {
    console.log(err)
    process.exit(1)
  }
}

start()
