const {readFile} = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, './products.json')

module.exports = {
  list,
  get
}

async function list(opts = {}) {
  const { offset = 0, limit = 25, tag } = opts

  const data = await readFile(productsFile)
  return JSON.parse(data)
    .filter((p, i) => !tag || p.tags.indexOf(tag) >= 0)
    .slice(offset, offset + limit)
}

async function get(id) {
  const products = JSON.parse(await readFile(productsFile))
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) return products[i]
  }

  return null
}

// curl -sG http://localhost:1337/products -d limit=25 -d offset=50
