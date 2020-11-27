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
  editUser,
  getDashboardData
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
  if (!req.isAdmin) return forbidden(next)

  const { id } = req.params

  const sale = await Sales.get(id)
  if (!sale) return next()

  res.json(sale)
}
async function createSale(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const sale = await Sales.create(req.body)
  res.json(sale)
}

async function listSales(req, res, next) {
  if (!req.isAdmin) return forbidden(next)
  const { offset = 0, limit = 25, productId, status } = req.query
  const opts = {
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  }
  // if (!req.isAdmin) opts.username = req.user.username
  const sales = await Sales.list(opts)
  res.json(sales)
  console.log(sales)
}

async function editSale(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const sale = await Sales.edit(req.params.id, change)
  res.json(sale)
}
async function deleteSale(req, res, next) {
  if (!req.isAdmin) return forbidden(next)

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
  // if (!req.isAdmin) return forbidden(next)

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

async function getDashboardData(req, res, next) {

  if (!req.isAdmin) return forbidden(next)

  // Last seven days to today Data retrieval logic
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  sevenDaysAgo.setHours(0, 0, 0, 0)
  console.log(sevenDaysAgo)
  const today = new Date
  today.setDate(today.getDate())
  today.setHours(23, 59, 59, 0)

  // Sales For Seven Days
  const sales = await Sales.model.find({
    timestamp: {
      $lt: today, $gt: sevenDaysAgo
    }
  }).sort({ timestamp: 1})

  // Purchases For Seven Days
  const purchases = await Purchases.model.find({
    timestamp: {
      $lt: today, $gt: sevenDaysAgo
    }
  }).sort({ timestamp: 1})

  // Expenses For Seven Days
  const expenses = await Expenses.model.find({
    timestamp: {
      $lt: today, $gt: sevenDaysAgo
    }
  }).sort({ timestamp: 1})

  // Today data retrieval Logic
  const todayMorning = new Date()
  todayMorning.setDate(todayMorning.getDate())
  todayMorning.setHours(0, 59, 59, 1000)
  const todayMidnight = new Date()
  todayMidnight.setDate(todayMidnight.getDate())
  todayMidnight.setHours(23, 59, 59, 1000)
  console.log(`Today begins ${todayMorning} and ends at ${todayMidnight}`)
  const salesToday = sales.filter(obj => {
    return obj.timestamp >= todayMorning && obj.timestamp <= todayMidnight
  }).length

  const purchasesToday = purchases.filter(obj => {
    return obj.timestamp >= todayMorning && obj.timestamp <= todayMidnight
  }).length

  const expensesToday = expenses.filter(obj => {
    return obj.timestamp >= todayMorning && obj.timestamp <= todayMidnight
  }).length

  // Last seven Days sales data Logic
  const last7DaysBeginning = new Date()
  last7DaysBeginning.setDate(last7DaysBeginning.getDate() - 7)
  last7DaysBeginning.setHours(0, 59, 59, 1000)
  console.log(last7DaysBeginning)
  const last7DaysEnding = new Date()
  last7DaysEnding.setDate(last7DaysEnding.getDate() - 7)
  last7DaysEnding.setHours(23, 59, 59, 0)
  console.log(`Last 7 Days begins ${last7DaysBeginning} and ends ${last7DaysEnding}`)
  const dayOneSales = sales.filter(obj => {
    return obj.timestamp >= last7DaysBeginning && obj.timestamp <= last7DaysEnding
  }).length

  const dayOnePurchases = purchases.filter(obj => {
    return obj.timestamp >= last7DaysBeginning && obj.timestamp <= last7DaysEnding
  }).length

  const dayOneExpenses = expenses.filter(obj => {
    return obj.timestamp >= last7DaysBeginning && obj.timestamp <= last7DaysEnding
  }).length

  // Last six Days sales data Logic
  const last6DaysBeginning = new Date()
  last6DaysBeginning.setDate(last6DaysBeginning.getDate() - 6)
  last6DaysBeginning.setHours(0, 59, 59, 1000)
  const last6DaysEnding = new Date()
  last6DaysEnding.setDate(last6DaysEnding.getDate() - 6)
  last6DaysEnding.setHours(23, 59, 59, 0)
  console.log(`Last 6 Days begins ${last6DaysBeginning} and ends ${last6DaysEnding}`)
  const dayTwoSales = sales.filter(obj => {
    return obj.timestamp >= last6DaysBeginning && obj.timestamp <= last6DaysEnding
  }).length

  const dayTwoPurchases = purchases.filter(obj => {
    return obj.timestamp >= last6DaysBeginning && obj.timestamp <= last6DaysEnding
  }).length

  const dayTwoExpenses = expenses.filter(obj => {
    return obj.timestamp >= last6DaysBeginning && obj.timestamp <= last6DaysEnding
  }).length

  // Last five Days sales data Logic
  const last5DaysBeginning = new Date()
  last5DaysBeginning.setDate(last5DaysBeginning.getDate() - 5)
  last5DaysBeginning.setHours(0, 59, 59, 1000)
  const last5DaysEnding = new Date()
  last5DaysEnding.setDate(last5DaysEnding.getDate() - 5)
  last5DaysEnding.setHours(23, 59, 59, 0)
  console.log(`Last 5 Days begins ${last5DaysBeginning} and ends ${last5DaysEnding}`)
  const dayThreeSales = sales.filter(obj => {
    return obj.timestamp >= last5DaysBeginning && obj.timestamp <= last5DaysEnding
  }).length

  const dayThreePurchases = purchases.filter(obj => {
    return obj.timestamp >= last5DaysBeginning && obj.timestamp <= last5DaysEnding
  }).length

  const dayThreeExpenses = expenses.filter(obj => {
    return obj.timestamp >= last5DaysBeginning && obj.timestamp <= last5DaysEnding
  }).length

  // Last four Days sales data Logic
  const last4DaysBeginning = new Date()
  last4DaysBeginning.setDate(last4DaysBeginning.getDate() - 4)
  last4DaysBeginning.setHours(0, 59, 59, 1000)
  const last4DaysEnding = new Date()
  last4DaysEnding.setDate(last4DaysEnding.getDate() - 4)
  last4DaysEnding.setHours(23, 59, 59, 0)
  console.log(`Last 4 Days begins ${last4DaysBeginning} and ends ${last4DaysEnding}`)
  const dayFourSales = sales.filter(obj => {
    return obj.timestamp >= last4DaysBeginning && obj.timestamp <= last4DaysEnding
  }).length

  const dayFourPurchases = purchases.filter(obj => {
    return obj.timestamp >= last4DaysBeginning && obj.timestamp <= last4DaysEnding
  }).length

  const dayFourExpenses = expenses.filter(obj => {
    return obj.timestamp >= last5DaysBeginning && obj.timestamp <= last5DaysEnding
  }).length

  // Last three Days sales data Logic
  const last3DaysBeginning = new Date()
  last3DaysBeginning.setDate(last3DaysBeginning.getDate() - 3)
  last3DaysBeginning.setHours(0, 59, 59, 1000)
  const last3DaysEnding = new Date()
  last3DaysEnding.setDate(last3DaysEnding.getDate() - 3)
  last3DaysEnding.setHours(23, 59, 59, 0)
  console.log(`Last 3 Days begins ${last3DaysBeginning} and ends ${last3DaysEnding}`)
  const dayFiveSales = sales.filter(obj => {
    return obj.timestamp >= last3DaysBeginning && obj.timestamp <= last3DaysEnding
  }).length

  const dayFivePurchases = purchases.filter(obj => {
    return obj.timestamp >= last3DaysBeginning && obj.timestamp <= last3DaysEnding
  }).length

  const dayFiveExpenses = expenses.filter(obj => {
    return obj.timestamp >= last3DaysBeginning && obj.timestamp <= last3DaysEnding
  }).length

  // Last two Days sales data Logic
  const last2DaysBeginning = new Date()
  last2DaysBeginning.setDate(last2DaysBeginning.getDate() - 2)
  last2DaysBeginning.setHours(0, 59, 59, 1000)
  const last2DaysEnding = new Date()
  last2DaysEnding.setDate(last2DaysEnding.getDate() - 2)
  last2DaysEnding.setHours(23, 59, 59, 0)
  console.log(`Last 2 Days begins ${last2DaysBeginning} and ends ${last2DaysEnding}`)
  const daySixSales = sales.filter(obj => {
    return obj.timestamp >= last2DaysBeginning && obj.timestamp <= last2DaysEnding
  }).length

  const daySixPurchases = purchases.filter(obj => {
    return obj.timestamp >= last2DaysBeginning && obj.timestamp <= last2DaysEnding
  }).length

  const daySixExpenses = expenses.filter(obj => {
    return obj.timestamp >= last2DaysBeginning && obj.timestamp <= last2DaysEnding
  }).length

  // Last one Days sales data Logic
  const last1DaysBeginning = new Date()
  last1DaysBeginning.setDate(last1DaysBeginning.getDate() - 1)
  last1DaysBeginning.setHours(0, 59, 59, 1000)
  const last1DaysEnding = new Date()
  last1DaysEnding.setDate(last1DaysEnding.getDate() - 1)
  last1DaysEnding.setHours(23, 59, 59, 0)
  console.log(`Last 1 Days begins ${last1DaysBeginning} and ends ${last1DaysEnding}`)
  const daySevenSales = sales.filter(obj => {
    return obj.timestamp >= last1DaysBeginning && obj.timestamp <= last1DaysEnding
  }).length

  const daySevenPurchases = purchases.filter(obj => {
    return obj.timestamp >= last1DaysBeginning && obj.timestamp <= last1DaysEnding
  }).length

  const daySevenExpenses = expenses.filter(obj => {
    return obj.timestamp >= last1DaysBeginning && obj.timestamp <= last1DaysEnding
  }).length

  const data = {
    totalSales: salesToday,
    totalPurchases: purchasesToday,
    totalExpenses: expensesToday,
    salesArray: [
      dayOneSales,
      dayTwoSales,
      dayThreeSales,
      dayFourSales,
      dayFiveSales,
      daySixSales,
      daySevenSales
    ],
    purchasesArray: [
      dayOnePurchases,
      dayTwoPurchases,
      dayThreePurchases,
      dayFourPurchases,
      dayFivePurchases,
      daySixPurchases,
      daySevenPurchases
    ],
    expensesArray: [
      dayOneExpenses,
      dayTwoExpenses,
      dayThreeExpenses,
      dayFourExpenses,
      dayFiveExpenses,
      daySixExpenses,
      daySevenExpenses
    ]
  }
  res.json(data)
}

// 1605625398095
// 1605626080703
function forbidden(next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}
