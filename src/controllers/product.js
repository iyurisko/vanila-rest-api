
import { randomUUID } from 'crypto';
import { readFile, writeFile, bodyParser } from '../utils.js'

const findById = async (req) => {
  const data = readFile('src/data/products.json')
  const id = req.url.split("/")[3];
  return data.find((p) => p.id === id)
}

export const getProducts = (req, res) => {
  try {
    const products = readFile('src/data/products.json')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: "success", products }))
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await findById(req)
    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: "success", product }))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

export const createProduct = async (req, res) => {
  try {
    const products = readFile('src/data/products.json')
    const product = await bodyParser(req)

    products.push({
      id: randomUUID(),
      ...product
    })

    writeFile('src/data/products.json', products)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: "success", message: "data has been created", product }))
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

export const updateProduct = async (req, res) => {
  try {
    const products = readFile('src/data/products.json')
    const product = await findById(req)
    if (product) {
      const { name, descriptions, price, stock } = await bodyParser(req)
      const updateProduct = {
        name: name || product.name,
        descriptions: descriptions || product.descriptions,
        price: price || product.price,
        stock: stock || product.stock
      }

      const idx = products.findIndex((p) => p.id === id)
      products[idx] = { id, ...updateProduct }

      writeFile('src/data/products.json', products)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: "success", product: updateProduct }))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    }
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}

export const deleteProduct = async (req, res) => {
  try {
    let products = readFile('src/data/products.json')
    const product = await findById(req)
    if (product) {
      products = products.filter((p) => p.id !== product.id)
      writeFile('src/data/products.json', products)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: `Product ${product.id} removed` }))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    }
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
}