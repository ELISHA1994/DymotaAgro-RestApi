const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const api = require('./api')
const auth = require('./auth')
const middleware = require('./middleware')

const port = process.env.PORT || 1337

const app = express()

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())


// Dashboard
app.get('/dashboard', auth.ensureUser, api.getDashboardData)

// Login
app.post('/login', auth.authenticate, auth.userLogin)
app.post('/adminlogin', auth.authenticate, auth.adminLogin)
app.get('/account',  auth.ensureUser, auth.currentAccount)
app.get('/logout', auth.logout)

// User create
app.post('/users', auth.ensureUser, api.createUser)
app.get('/users', api.listUsers)
app.get('/users/:username', auth.ensureUser, api.getUser)
app.put('/users/:username', auth.ensureUser, api.editUser)
app.put('/password/:username', auth.ensureUser, auth.changePassword)
app.delete('./users/:username', auth.ensureUser, api.deleteUser)



//Product end-point
app.post('/products', auth.ensureUser, api.createProduct)
app.get('/products', auth.ensureUser, api.listProducts)
app.get('/products/:id', auth.ensureUser, api.getProduct)
app.put('/products/:id', auth.ensureUser, api.editProduct)
app.delete('/products/:id', auth.ensureUser, api.deleteProduct)

// Sales end-point
app.post('/sales', auth.ensureUser, api.createSale)
app.get('/sales', auth.ensureUser, api.listSales)
app.get('/sales/:id', auth.ensureUser, api.getSale)
app.put('/sales/:id', auth.ensureUser, api.editSale)
app.delete('/sales/:id', auth.ensureUser, api.deleteSale)

// customer end-point
app.post('/customers', auth.ensureUser, api.createCustomer)
app.get('/customers', auth.ensureUser, api.listCustomers)
app.get('/customers/:id', auth.ensureUser, api.getCustomer)
app.put('/customers/:id', auth.ensureUser, api.editCustomer)
app.delete('/customers/:id', auth.ensureUser, api.deleteCustomer)

// Employee end-point
app.post('/employees', auth.ensureUser, api.createEmployee)
app.get('/employees', auth.ensureUser, api.listEmployees)
app.get('/employees/:id', auth.ensureUser, api.getEmployee)
app.put('/employees/:id', auth.ensureUser, api.editEmployee)
app.delete('/employees/:id', auth.ensureUser, api.deleteEmployee)

// Supplier end-point
app.post('/suppliers', auth.ensureUser, api.createSupplier)
app.get('/suppliers', auth.ensureUser, api.listSuppliers)
app.get('/suppliers/:id', auth.ensureUser, api.getSupplier)
app.put('/suppliers/:id', auth.ensureUser, api.editSupplier)
app.delete('/suppliers/:id', auth.ensureUser, api.deleteSupplier)

// Purchases end-point
app.post('/purchases', auth.ensureUser, api.createPurchase)
app.get('/purchases', auth.ensureUser, api.listPurchases)
app.get('/purchases/:id', auth.ensureUser, api.getPurchase)
app.put('/purchases/:id', auth.ensureUser, api.editPurchase)
app.delete('/purchases/:id', auth.ensureUser, api.deletePurchase)

// Expenses end-point
app.post('/expenses', auth.ensureUser, api.createExpense)
app.get('/expenses', auth.ensureUser, api.listExpenses)
app.get('/expenses/:id', auth.ensureUser, api.getExpense)
app.put('/expenses/:id', auth.ensureUser, api.editExpense)
app.delete('/expenses/:id', auth.ensureUser, api.deleteExpense)

// Not Found and Error Middleware
app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
)

if (require.main !== module) {
  module.exports = server
}

// :- List :- curl -s http://localhost:1337/path | jq
// :- Create :- curl -sX POST http://localhost:1337/path -H 'Content-Type: application/json' -d '{}' | jq
// :- Edit :- curl -X PUT http://localhost:1337/path/id -H 'Content-Type: application/json' -d '{"change object"}' | jq
// :- Get :- curl -s http://localhost:1337/path/id | jq
// :- Delete :- curl -X DELETE http://localhost:1337/products/cjvo3vikw0003n8gl0tq318zo
// :- mongo --port 8080  || use DYMOTA_AGRO || db.purchases.find().pretty()
// :- sudo mongod --dbpath /Users/elishabello/Desktop/data/db --port 8080
// :- login command curl -iX POST -H 'content-type: application/json' -d '{"username": "admin", "password": "iloveyoudebbie"}' --cookie-jar cookies http://localhost:1337/login
                 // Login using jwt
// :- login command curl -X POST -H 'content-type: application/json' -d '{"username": "admin", "password": "iloveyoudebbie"}' http://localhost:1337/login | jq -r .token > admin.jwt
// curl -H "authorization: Bearer $(cat admin.jwt)" http://localhost:1337/products
// curl -H "authorization: Bearer $(cat admin.jwt)" http://localhost:1337/products

// curl -iX POST -H 'content-type: application/json' -d '{ "username": "donny", "email": "donald@kerabatsos.io", "password": "I love surfing" }' http://localhost:1337/users
// -d '{ "username": "elisha", "name": "Elisha Bello" "email": "elishabello2014@gmail.com", "password": "iloveyoudebbie", "role": "admin", "avatar": "resources/images/avatars/1.jpg", "phone": "07066513015", "salaryPlan": "Monthly" }'

// curl -iX POST -H 'content-type: application/json'  -d '{"username": "donny", "password": "I love surfing"}' http://localhost:1337/login
// curl -iX POST -H 'content-type: application/json' -d '{ "username": "elisha", "name": "Elisha Bello", "email": "elishabello2014@gmail.com", "password": "iloveyoudebbie", "role": "admin", "avatar": "resources/images/avatars/1.jpg", "phone": "07066513015", "salaryPlan": "Monthly" }' http://localhost:1337/users
// curl -X POST -H 'content-type: application/json'  -d '{"username": "elisha", "password":"iloveyoudebbie"}' http://localhost:1337/login | jq -r .token > admin.jwt
// '{"products": ["ckfpf872b00003mtgc2zxagqz", "ckfpfuap200002otg5zcc4ruw", "ckfra4yyn0000bhtg0o6hdljr"], "customer": "ckfrgiyou0001zdtg90w6d4k2", "employee": "ckfss5r9f0000k7vq3s6qdr9l", "invoiceId": "DYKE01", "totalPrice": 750000000 }'
