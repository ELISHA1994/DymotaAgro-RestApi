const cuid = require('cuid')

const db = require('../db')

const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  name: {type: String, required: true },
  purchasePrice: {type: Number, required: true },
  sellingPrice: {type: Number, required: true },
  quantity: { type: Number, default: 0 },
  timestamp: { type: Number, default: Date.now() },
  expiryDate: { type: String, required: true },
  priceAdjustment: {
    type: String,
    index: true,
    default: 'FLEXIBLE',
    enum: ['FIXED', 'FLEXIBLE']
  }
})

module.exports = {
  list,
  get,
  create,
  edit,
  remove,
  addProduct,
  subtractProduct,
  getPrice,
}


async function list(opts = {}) {
  const { offset = 0, limit = 25, tag } = opts

  const query = tag ? { tags: tag } : {}
  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
  return products
}
async function getPrice(_id) {
  const product =  await Product.findById(_id)
  // console.log('from product', product.sellingPrice)
  return product.sellingPrice
}
async function get(_id) {
  const product = await Product.findById(_id)
  return product
}

async function create(fields) {
  const product = await new Product(fields).save()
  return product
}

async function edit(_id, change) {
  const product = await get(_id)
  Object.keys(change).forEach(function (key) {
    product[key] = change[key]
  })
  await product.save()
  return product
}
async function addProduct(_id, change) {
  const product = await get(_id)
  Object.keys(change).forEach(function (key) {
    product[key] += change[key]
  })
  await product.save()
  return product
}

async function subtractProduct(_id, change) {
  const product = await get(_id)
  Object.keys(change).forEach(function (key) {
    product[key] -= change[key]
  })
  await product.save()
  return product
}

async function remove(_id) {
  await Product.deleteOne({ _id })
}

// curl -sG http://localhost:1337/products -d limit=25 -d offset=50
