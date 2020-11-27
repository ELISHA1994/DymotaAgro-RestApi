const cuid = require('cuid')
const Products = require('./products')
const db = require('../db')

// const lastWeek = new Date()
// lastWeek.setDate(lastWeek.getDate() -7)
// lastWeek.setHours(0, 59, 59, 1000)
const Sale = db.model('Sale', {
  _id: { type: String, default: cuid },
  products: [
    {
      _id: false,
      productID: {
        type: String,
        ref: 'Product',
        required: true
      },
      quantity: { type: String, required: true }
    }
  ],
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  timestamp: {type: Number, default: new Date() },
  customer: {
    type: String,
    ref: 'Customer',
    required: true
  },
  employee: {
    type: String,
    ref: 'Employee',
    required: true
  },
  invoiceId: { type: String, required: true },
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED']
  }
})

module.exports = {
  get,
  create,
  list,
  edit,
  remove,
  model: Sale
}
// 1605194171625

async function create(fields) {
  const sale = await new Sale(fields)
  let totalQuantity = 0
  let totalPrice = 0
  let change = {
    quantity: 0
  }
  for (const {productID, quantity} of sale.products) {
    change.quantity = quantity
    await Products.subtractProduct(productID, change)

    const price = await Products.getPrice(productID)
    totalQuantity += parseInt(quantity)
    totalPrice += parseInt(price)
  }
  if (fields.discount) {
    const discount = fields.discount
    totalPrice -= parseInt(discount)
  }
  sale.totalQuantity = totalQuantity
  sale.totalPrice = totalPrice
  await sale
    .populate('customer')
    .populate('employee')
    .execPopulate()
  await sale.save()
  return sale
}

async function edit(_id, change) {
  const sale = await get(_id)
  Object.keys(change).forEach(function (key) {
    sale[key] = change[key]
  })
  await sale.save()
  return sale
}

async function get(_id) {
  const sale = await Sale.findById(_id)
    .populate('product')
    .populate('customer')
    .populate('employee')
    .exec()
  return sale
}

async function list(opts = {}) {
  const { offset = 0, limit = 25, tag } = opts

  const query = tag ? { tags: tag } : {}
  const sales = await Sale.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
  return sales

}
async function remove(_id) {
  await Sale.deleteOne({ _id })
}
