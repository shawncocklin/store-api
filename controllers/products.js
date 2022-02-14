const Product = require('../models/products')

async function getAllProductsStatic(req,res,next) {
  throw new Error('testing async error')
  res.status(200).json({
    success: true,
    msg: 'testing'
  })
}

async function getAllProducts(req,res,next) {
  const {featured, company, name, sort, fields, numericFilters} = req.query
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
  if(numericFilters) {
    const operatorMap = {
      '>':'$gt',
      '<':'$lt',
      '>=':'$gte',
      '<=':'$lte',
      '=':'$eq',
    }
    const regEx = /\b(<|>|<=|>=|=)\b/g
    let filters = numericFilters.replace(regEx, match => `-${operatorMap[match]}-`)
    const options = ['price','rating']
    filters = filters.split(',').forEach(item => {
      const [field,operator,value] = item.split('-')
      if(options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)}
      }
    })

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
  // reference page number
  const page = Number(req.query.page) || 1
  // how many items per page, which will determine how many pages there are
  const limit = Number(req.query.limit) || 10
  // this will act as logic to change page when number > 0 is the result
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  const products = await result
  res.status(200).json({nbHits: products.length ,products})
}

module.exports = {
  getAllProductsStatic, 
  getAllProducts
}