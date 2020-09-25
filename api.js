const Products = require('./products')

module.exports = {
  listProducts
}

async function listProducts(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { offset = 0, limit = 25 } = req.query

  try {
    res.json(await Products.list({
      offset: Number(offset),
      limit: Number(limit)
    }))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
