const Products = require('./models/products')
const Sales = require('./models/sales')
const Customers = require('./models/customers')
const Employees = require('./models/employees')

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
  listCustomers,
  getCustomer,
  createCustomer,
  editCustomer,
  deleteCustomer,
  listEmployees,
  getEmployee,
  createEmployee,
  editEmployee,
  deleteEmployee
}

// Products handler
async function getProduct(req, res, next) {
  const { id } = req.params

    const product = await Products.get(id)
    if (!product) return next()

    res.json(product)

}
async function listProducts(req, res) {

  const { offset = 0, limit = 25, tag } = req.query

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })
    res.json(products)
}
async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}
async function editProduct(req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}
async function deleteProduct(req, res, next) {
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

  const sales = await Sales.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  })
  res.json(sales)
}

async function editSale(req, res, next) {
  const change = req.body
  const sale = await Sales.edit(req.params.id, change)
  res.json(sale)
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

// curl -X POST -d '{"description":"test product", "link":"https://example.com"}' -H "Content-Type: application/json" http://localhost:1337/products



