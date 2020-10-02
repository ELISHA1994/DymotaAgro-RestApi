const express = require('express')
const bodyParser = require('body-parser')

const api = require('./api')
const middleware = require('./middleware')

const port = process.env.PORT || 1337
const app = express()

// middlewares
app.use(middleware.cors)
app.use(bodyParser.json())

//Product end-point
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Sales end-point
app.get('/sales', api.listSales)
app.get('/sales/:id', api.getSale)
app.post('/sales', api.createSale)
app.put('/sales/:id', api.editSale)

// customer end-point
app.get('/customers', api.listCustomers)
app.get('/customers/:id', api.getCustomer)
app.post('/customers', api.createCustomer)
app.put('/customers/:id', api.editCustomer)
app.delete('/customers/:id', api.deleteCustomer)

// Employee end-point
app.get('/employees', api.listEmployees)
app.get('/employees/:id', api.getEmployee)
app.post('/employees', api.createEmployee)
app.put('/employees/:id', api.editEmployee)
app.delete('/employees/:id', api.deleteEmployee)

// Not Found and Error Middleware
app.use(middleware.handleError)
app.use(middleware.notFound)

app.listen(port, () => console.log(`Server listening on port ${port}`))
