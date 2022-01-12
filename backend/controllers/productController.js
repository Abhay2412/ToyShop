import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @description: Get all of the products in the database
// @route: GET Request to the products
//@acesss: Public-> meaning anyone can hit this route
const getProducts = asyncHandler(async (request, response) => {
    const products = await Product.find({});

    response.json(products);
})

// @description: Get one single item in the database
// @route: GET Request to the product with their id's 
//@acesss: Public-> meaning anyone can hit this route
const getProductByID = asyncHandler(async (request, response) => {
    const item = await Product.findById(request.params.id);

    if(item) {
        response.json(item);
    } else {
        response.status(404);
        throw new Error('Item not found');
    }
})

export { getProducts, getProductByID };