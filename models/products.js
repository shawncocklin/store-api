const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide product name'],
    trim: true,
  },

  price: {
    type: Number,
    required: [true, 'must provide product price'],
  },

  featured: {
    type: Boolean,
    default: false,
  },

  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'marcos', 'caressa'],
      message: '{VALUE} is not supported'
    }
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Products', ProductSchema)