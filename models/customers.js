const cuid = require('cuid')
const db = require('../db')
const { isEmail } = require('validator')

const Customer = db.model('Customer', {
  _id: { type: String, default: cuid },
  name: { type: String, required: true },
  email: emailSchema({ required: true }),
  phone: { type: Number, required: true },
  balance: { type: Number, required: true, default: 0 },
  timestamp: { type: Number, default: Date.now() }
})

module.exports = {
  list,
  get,
  create,
  edit,
  remove
}

async function list(opts = {}) {
  const { offset = 0, limit = 25, tag } = opts

  const query = tag ? { tags: tag } : {}
  const customers = await Customer.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
  return customers
}

async function get(_id) {
  const customer = await Customer.findById(_id)
  return customer
}

async function create(fields) {
  const customer = await new Customer(fields).save()
  return customer
}
async function edit(_id, change) {
  const customer = await get(_id)
  Object.keys(change).forEach(function (key) {
    customer[key] = change[key]
  })
  await customer.save()
  return customer
}
async function remove(_id) {
  await Customer.deleteOne({ _id })
}



function emailSchema(opt = {}) {
  const { required } = opt
  return {
    type: String,
    required: !!required,
    validate: {
      validator: isEmail,
      message: props => `${props.value} is not a valid email`
    }
  }
}
