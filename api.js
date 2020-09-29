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

// curl -X POST -d '{"description":"test product", "link":"https://example.com"}' -H "Content-Type: application/json" http://localhost:1337/products



