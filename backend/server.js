const express = require('express')
const products = require('./data/products')

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

app.listen(5000, console.log('Server running on port 5000'))