const Products = require('./products')

module.exports = {
  getProduct,
  listProducts,
  createProduct,
  editProduct,
  deleteProduct
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
  console.log('request body', req.body)
  res.json(req.body)
}
async function editProduct(req, res, next) {
  console.log('request body', req.body)
  res.json(req.body)
}
async function deleteProduct(req, res, next) {
  res.json({ success: true })
}

// curl -X POST -d '{"description":"test product", "link":"https://example.com"}' -H "Content-Type: application/json" http://localhost:1337/products



