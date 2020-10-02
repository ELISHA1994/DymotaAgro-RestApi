const cuid = require('cuid')

const db = require('../db')

const Employee = db.model('Employee', {
  _id: { type: String, default: cuid },
  name: { type: String, required: true },
  password: { type: String, required: true, default: 'password'},
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  gender: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, required: true },
  salaryPlan: {
    type: String,
    index: true,
    default: 'MONTHLY',
    enm: ['MONTHLY', 'WEEKLY', 'PER-HOUR']
  }
})

module.exports = {
  list,
  get,
  create,
  edit,
  remove
}

async function list(opts = {}) {
  const { offset = 0, limit = 25 } = opts

  const employees = await Employee.find()
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
  return employees
}

async function get(_id) {
  const employee = await Employee.findById(_id)
  return employee
}

async function create(fields) {
  const employee = await new Employee(fields).save()
  return employee
}

async function edit(_id, change) {
  const employee = await get(_id)
  Object.keys(change).forEach(function (key) {
    employee[key] = change[key]
  })
  await employee.save()
  return employee
}

async function remove(_id) {
  await Employee.deleteOne({ _id })
}
