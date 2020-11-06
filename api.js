const Products = require('./models/products')
const Sales = require('./models/sales')
const Customers = require('./models/customers')
const Employees = require('./models/employees')
const Suppliers = require('./models/suppliers')
const Purchases = require('./models/purchases')
const Expenses = require('./models/expenses')
const Users = require('./models/users')

module.exports = {
  getProduct,
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
  createSale,
  listSales,
  getSale,
  editSale,
  deleteSale,
  listCustomers,
  getCustomer,
  createCustomer,
  editCustomer,
  deleteCustomer,
  listEmployees,
  getEmployee,
  createEmployee,
  editEmployee,
  deleteEmployee,
  createSupplier,
  listSuppliers,
  getSupplier,
  editSupplier,
  deleteSupplier,
  createPurchase,
  listPurchases,
  getPurchase,
  editPurchase,
  deletePurchase,
  createExpense,
  listExpenses,
  getExpense,
  editExpense,
  deleteExpense,
  createUser,
  deleteUser,
  getUser,
  listUsers,
  editUser
}

// Products handler
async function createProduct(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const product = await Products.create(req.body)
  res.json(product)
}

async function getProduct(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const { id } = req.params

  const product = await Products.get(id)
  if (!product) return next()

  res.json(product)
}

async function listProducts(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const { offset = 0, limit = 25, tag } = req.query

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })
    res.json(products)
}

async function editProduct(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

async function deleteProduct(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  await Products.remove(req.params.id)
  res.json({ success: true })
}

// Sales handler
async function getSale(req, res, next) {
  const { id } = req.params

  const sale = await Sales.get(id)
  if (!sale) return next()

  res.json(sale)
}
async function createSale(req, res, next) {
  const sale = await Sales.create(req.body)
  res.json(sale)
}

async function listSales(req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query
  const opts = {
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  }
  if (!req.isAdmin) opts.username = req.user.username
  const sales = await Sales.list(opts)
  res.json(sales)
}

async function editSale(req, res, next) {
  const change = req.body
  const sale = await Sales.edit(req.params.id, change)
  res.json(sale)
}
async function deleteSale(req, res, next) {
  await Sales.remove(req.params.id)
  res.json({ success: true })
}

// Customer handler
async function listCustomers(req, res, next) {
  const { offset = 0, limit = 25 } = req.query
  const customers = await Customers.list({
    offset: Number(offset),
    limit: Number(limit)
  })
  res.json(customers)
}
async function getCustomer(req, res, next) {
  const  { id } = req.params
  const customer = await Customers.get(id)
  if (!customer) return next()

  res.json(customer)
}

async function createCustomer(req, res, next) {
  const customer = await Customers.create(req.body)
  res.json(customer)
}

async function editCustomer(req, res, next) {
  const change = req.body
  const customer = await Customers.edit(req.params.id, change)
  res.json(customer)
}

async function deleteCustomer(req, res, next) {
  await Customers.remove(req.params.id)
  res.json({ success: true })
}

// Employee handler
async function listEmployees(req, res, next) {
  const { offset = 0, limit = 25 } = req.query
  const employees = await Employees.list({
    offset: Number(offset),
    limit: Number(limit)
  })
  res.json(employees)
}

async function getEmployee(req, res, next) {
  const { id } =  req.params
  const employee = await Employees.get(id)
  if (!employee) return next()
  res.json(employee)
}

async function createEmployee(req, res, next) {
  const employee = await Employees.create(req.body)
  res.json(employee)
}

async function editEmployee(req, res, next) {
  const change = req.body
  const employee = await Employees.edit(req.params.id, change)
  res.json(employee)
}

async function deleteEmployee(req, res, next) {
  await Employees.remove(req.params.id)
  res.json({ success: true })
}

// Supplier handler
async function createSupplier(req, res, next) {
  const supplier = await Suppliers.create(req.body)
  res.json(supplier)
}

async function listSuppliers(req, res, next) {
  const { offset = 0, limit = 25 } = req.query
  const suppliers = await Suppliers.list({
    offset: Number(offset),
    limit: Number(limit)
  })
  res.json(suppliers)
}

async function getSupplier(req, res, next) {
  const { id } = req.params
  const supplier = await Suppliers.get(id)
  if (!supplier) return next()
  res.json(supplier)
}

async function editSupplier(req, res, next) {
  const change = req.body
  const supplier = await Suppliers.edit(req.params.id, change)
  res.json(supplier)
}

async function deleteSupplier(req, res, next) {
  await Suppliers.remove(req.params.id)
  res.json({ success: true })
}

// Purchase handler
async function createPurchase(req, res, next) {
  const purchase = await Purchases.create(req.body)
  res.json(purchase)
}

async function listPurchases(req, res, next) {
  const {offset = 0, limit = 25} = req.query
  const purchases = await Purchases.list({
    offset: Number(offset),
    limit: Number(limit)
  })
  res.json(purchases)
}

async function getPurchase(req, res, next) {
  const { id } = req.params
  const purchase = await Purchases.get(id)
  if (!purchase) return next()
  return res.json(purchase)
}

async function editPurchase(req, res, next) {
  const change = req.body
  const purchase = await Purchases.edit(req.params.id, change)
  return res.json(purchase)
}
async function deletePurchase(req, res, next) {
  await Purchases.remove(req.params.id)
  res.json({ success: true })
}

// Expenses handler
async function createExpense(req, res, next) {
  const expense = await Expenses.create(req.body)
  res.json(expense)
}

async function listExpenses(req, res, next) {
  const {offset = 0, limit = 25} = req.query
  const expenses = await Expenses.list({
    offset: Number(offset),
    limit: Number(limit)
  })
  res.json(expenses)
}

async function getExpense(req, res, next) {
  const { id } = req.params
  const expense = await Expenses.get(id)
  if (!expense) return next()
  return res.json(expense)
}

async function editExpense(req, res, next) {
  const change = req.body
  const expense = await Expenses.edit(req.params.id, change)
  return res.json(expense)
}

async function deleteExpense(req, res, next) {
  await Expenses.remove(req.params.id)
  return res.json({ success: true })
}

async function createUser(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const user = await Users.create(req.body)
  const { username, email, avatar, role, phone, salaryPlan, name } = user
  res.json({ username, email, avatar, role, phone, salaryPlan, name })
}

async function deleteUser(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  await Users.remove(req.params.username)
  return res.json({ success: true })
}

async function getUser(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const { username } = req.params
  const user = await Users.get(username)
  console.log(user)
}

async function listUsers(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const {offset = 0, limit = 25} = req.query
  const users = await Users.list({
    offset: Number(offset),
    limit: Number(limit)
  })
  res.json(users)
}

async function editUser(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const user = await Users.edit(req.params.username, change)
  res.json(user)
}


function forbidden(next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}
