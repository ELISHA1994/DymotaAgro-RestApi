const cuid = require('cuid')

const db = require('../db')

const Sale = db.model('Sale', {
  _id: { type: String, default: cuid },
  products: [
    {
      type: String,
      ref: 'Product',
      index: true,
      required: true
    }
  ],
  price: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0 },
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
  edit
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
    .populate('products')
    .populate('customer')
    .populate('employee')
    .exec()
  return sale
}

async function create(fields) {
  const sale = await new Sale(fields).save()
  await sale
    .populate('products')
    .populate('customer')
    .populate('employee')
    .execPopulate()
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
