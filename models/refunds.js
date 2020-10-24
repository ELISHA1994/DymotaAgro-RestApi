const cuid = require('cuid')
const db = require('../db')

const Refund = db.model('Refund', {
  _id: { type: String, default: cuid },
  products: [
    {
      _id: false,
      productID: {
        type: String,
        required: true
      },
      quantity: { type: Number, required: true },
      pricePerProduct: { type: Number, required: true }
    }
  ],
})
