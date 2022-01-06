import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/database.js';

import productRoutes from './routes/productRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.get('/', (request, response) => {
    response.send('The GET API is working...');
})

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))