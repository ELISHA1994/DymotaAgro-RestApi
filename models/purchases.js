const cuid = require('cuid')
const db = require('../db')
const Products = require('./products');

const Purchase = db.model('Purchase', {
  _id: { type: String, default: cuid },
  timestamp: { type: Number, default: Date.now() },
  products: [
    {
      _id: false,
      product: {
        type: String,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, required: true },
      purchasePrice: { type: Number }
    }
  ],
  supplier: {
    type: String,
    ref: 'Supplier',
    required: true
  },
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 }
})

module.exports = {
  create,
  remove,
  list,
  get,
  edit
}

async function create(fields) {
  const purchase = await new Purchase(fields)
  let totalQuantity = 0
  let totalPrice = 0
  let change = {
    quantity: 0
  }
  await purchase.products.forEach(({ product, quantity, purchasePrice }) => {
    change.quantity = quantity
    Products.addProduct(product, change)
    Products.edit(product, purchasePrice)
    totalQuantity += quantity
    totalPrice += purchasePrice
  })
  purchase.totalQuantity = totalQuantity
  purchase.totalPrice = totalPrice
  await purchase.save()
  await purchase
    .populate('supplier')
    .execPopulate()
  return purchase
}

async function list(opts = {}) {
  const { offset = 0, limit = 25, tag } = opts

  const query = tag ? { tags: tag } : {}
  const purchases = await Purchase.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
  return purchases
}

async function get(_id) {
  const purchase = await Purchase.findById(_id)
    .populate('supplier')
    .exec()
  return purchase
}
async function edit(_id, change) {
  const purchase = await get(_id)
  Object.keys(change).forEach(function (key) {
    purchase[key] = change[key]
  })
  await purchase.save()
  return purchase
}

async function remove(_id) {
  await Purchase.deleteOne({ _id })
}

// curl -sX POST http://localhost:1337/purchases -H 'Content-Type: application/json' -d '{"products": [{"product": "ckfpf872b00003mtgc2zxagqz", "quantity": "10000"}, {"product": "ckfpfuap200002otg5zcc4ruw", "quantity": "10000"}, {"product": "ckfra4yyn0000bhtg0o6hdljr", "quantity": "10000"}], "supplier": "ckfxcho700001advqgmbvfg9i", "price": "950000000" }' | jq
//  curl -sX POST http://localhost:1337/sales -H 'Content-Type: application/json' -d '{"products": [{"productID": "ckfpf872b00003mtgc2zxagqz", "quantity": "1000"}, {"productID": "ckfpfuap200002otg5zcc4ruw", "quantity": "1000"}, {"productID": "ckfra4yyn0000bhtg0o6hdljr", "quantity": "1000"}], "discount": "5000", "customer": "ckfrgiyou0001zdtg90w6d4k2", "employee": "ckfss5r9f0000k7vq3s6qdr9l", "invoiceId": "DYK001"  }' | jq
