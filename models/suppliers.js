const cuid = require('cuid')
const db = require('../db')
const { isEmail } = require('validator')

const Supplier = db.model('Supplier', {
  _id: { type: String, default: cuid },
  name: { type: String, required: true },
  email: emailSchema({ required: true }),
  phone: { type: Number, required: true },
  balance: { type: Number, required: true }
})

module.exports = {
  create,
  list,
  get,
  edit,
  remove
}

async function create(fields) {
  const supplier = await new Supplier(fields).save()
  return supplier
}

async function list(opts = {}) {
  const { offset = 0, limit = 25 } = opts

  const supplier = await Supplier.find()
    .sort({_id: 1})
    .skip(offset)
    .limit(limit)
  return supplier
}

async function get(_id) {
  const supplier = await Supplier.findById(_id)
  return supplier
}

async function edit(_id, change) {
  const supplier = await get(_id)
  Object.keys(change).forEach(key => {
    supplier[key] = change[key]
  })
  await supplier.save()
  return supplier
}

async function remove(_id) {
  await Supplier.deleteOne({ _id })
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
