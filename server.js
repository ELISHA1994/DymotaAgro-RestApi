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
app.post('/products', api.createProduct)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Sales end-point
app.post('/sales', api.createSale)
app.get('/sales', api.listSales)
app.get('/sales/:id', api.getSale)
app.put('/sales/:id', api.editSale)
app.delete('/sales/:id', api.deleteSale)

// customer end-point
app.post('/customers', api.createCustomer)
app.get('/customers', api.listCustomers)
app.get('/customers/:id', api.getCustomer)
app.put('/customers/:id', api.editCustomer)
app.delete('/customers/:id', api.deleteCustomer)

// Employee end-point
app.post('/employees', api.createEmployee)
app.get('/employees', api.listEmployees)
app.get('/employees/:id', api.getEmployee)
app.put('/employees/:id', api.editEmployee)
app.delete('/employees/:id', api.deleteEmployee)

// Supplier end-point
app.post('/suppliers', api.createSupplier)
app.get('/suppliers', api.listSuppliers)
app.get('/suppliers/:id', api.getSupplier)
app.put('/suppliers/:id', api.editSupplier)
app.delete('/suppliers/:id', api.deleteSupplier)

// Purchases end-point
app.post('/purchases', api.createPurchase)
app.get('/purchases', api.listPurchases)
app.get('/purchases/:id', api.getPurchase)
app.put('/purchases/:id', api.editPurchase)
app.delete('/purchases/:id', api.deletePurchase)

// Expenses end-point
app.post('/expenses', api.createExpense)
app.get('/expenses', api.listExpenses)
app.get('/expenses/:id', api.getExpense)
app.put('/expenses/:id', api.editExpense)
app.delete('/expenses/:id', api.deleteExpense)

// Not Found and Error Middleware
app.use(middleware.handleError)
app.use(middleware.notFound)

app.listen(port, () => console.log(`Server listening on port ${port}`))


// :- List :- curl -s http://localhost:1337/path | jq
// :- Create :- curl -sX POST http://localhost:1337/path -H 'Content-Type: application/json' -d '{}' | jq
// :- Edit :- curl -X PUT http://localhost:1337/path/id -H 'Content-Type: application/json' -d '{"change object"}' | jq
// :- Get :- curl -s http://localhost:1337/path/id | jq
// :- Delete :- curl -X DELETE http://localhost:1337/products/cjvo3vikw0003n8gl0tq318zo
// :- mongo --port 8080  || use DYMOTA_AGRO || db.purchases.find().pretty()
// :- sudo mongod --dbpath /Users/elishabello/Desktop/data/db --port 8080
