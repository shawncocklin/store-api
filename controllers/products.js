async function getAllProductsStatic(req,res,next) {
  res.status(200).json({
    success: true,
    msg: 'testing'
  })
}

async function getAllProducts(req,res,next) {
  res.status(200).json({
    success: true,
    msg: 'products route'
  })
}

module.exports = {
  getAllProductsStatic, 
  getAllProducts
}