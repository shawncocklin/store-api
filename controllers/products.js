const Product = require('../models/products')

async function getAllProductsStatic(req,res,next) {
  throw new Error('testing async error')
  res.status(200).json({
    success: true,
    msg: 'testing'
  })
}

async function getAllProducts(req,res,next) {
  const {featured, company, name, rating, price, sort, fields} = req.query
  const queryObject = {}
  if(featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if(company) {
    queryObject.company = {$regex: company, $options: 'i'}
  }
  if(name) {
    queryObject.name = {$regex: name, $options: 'i'}
  }
  
  let result = Product.find(queryObject)
  if(sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  if(fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }
  const products = await result
  res.status(200).json({nbHits: products.length ,products})
}

module.exports = {
  getAllProductsStatic, 
  getAllProducts
}