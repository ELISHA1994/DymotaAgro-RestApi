const cuid = require('cuid')

const db = require('../db')

const Expense = db.model('Expense', {
  _id: { type: String, default: cuid },
  person: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  timestamp: {type: Number, default: new Date() },
  employee: {
    type: String,
    ref: 'Employee',
    required: true
  }
})

module.exports = {
  create,
  list,
  get,
  edit,
  remove,
  model: Expense
}

async function create(fields) {
  const expense = await new Expense(fields)
  await expense
    .populate('employee')
    .execPopulate()
  await expense.save()
  return expense
}

async function list(opt = {}) {
  const { offset = 0, limit = 25, tag } = opt

  const query = tag ? { tags: tag } : {}
  const expenses = await Expense.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
  return expenses
}

async function get(_id) {
  const expense = await Expense.findById(_id)
  return expense
}

async function edit(_id, change) {
  const expense = await get(_id)
  Object.keys(change).forEach(function (key) {
    expense[key] = change[key]
  })
  await expense.save()
  return expense
}

async function remove(_id) {
  await Expense.deleteOne({ _id })
}
