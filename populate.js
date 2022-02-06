require('dotenv').config()
const {connectDB} = require('./db/connect')

const Product = require('./models/products')
const jsonProducts = require('./products.json')

async function start() {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log('db populated')
    process.exit(0)
  } catch(err) {
    console.log(err)
    process.exit(1)
  }
}

start()
