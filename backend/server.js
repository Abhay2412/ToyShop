const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products')

dotenv.config()

const app = express()

app.get('/', (request, response) => {
    response.send('The GET API is working...')
})

app.get('/api/products', (request, response) => {
    response.json(products)
})

app.get('/api/products/:id', (request, response) => {
    const item = products.find(i => i._id === request.params.id)
    response.json(item)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))