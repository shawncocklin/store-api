function notFound(req,res,next) {
  return res.status(404).send('Route does not exist. Please check the name of the route you wish to connect to')
}

module.exports = notFound