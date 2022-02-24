import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @description: Get all of the products in the database
// @route: GET Request to the products
//@acesss: Public-> meaning anyone can hit this route
const getProducts = asyncHandler(async (request, response) => {
    const products = await Product.find({});

    response.json(products);
});

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
});

// @description: Delete one single item in the database
// @route: DELETE  Request to the product with their id's and removing them
//@acesss: Private-> protected route not to the public
const deleteProduct = asyncHandler(async (request, response) => {
    const item = await Product.findById(request.params.id);

    if(item) {
        await item.remove();
        response.json({ message: 'The item is now removed' });
    } else {
        response.status(404);
        throw new Error('Item not found');
    }
});

// @description: Create one single item in the database
// @route: POST  Request to the product and creating it
//@acesss: Private-> protected route not to the public
const createProduct = asyncHandler(async (request, response) => {
    const item = new Product ({
        name: 'Sample name',
        price: 0,
        user: request.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Simple description'
    });

    const createdItem = await item.save();
    response.status(201).json(createdItem);
});

// @description: Update one single item in the database
// @route: PUT  Request to the product with their id's and updating them
//@acesss: Private-> protected route not to the public
const updateProduct = asyncHandler(async (request, response) => {
    const {
        name,
        price, 
        description, 
        image, 
        brand, 
        category, 
        countInStock,
    } = request.body;

    const item = await Product.findById(request.params.id);
    
    if(item) {
        item.name = name;
        item.price = price;
        item.description = description;
        item.image = image;
        item.brand = brand;
        item.category = category;
        item.countInStock = countInStock;

        const updatedItem = await item.save();
        response.status(201).json(updatedItem);
    }
    else {
        response.status(404);
        throw new Error('The item is not found');
    }
});

// @description: Creating a new review for one single item in the database
// @route: POST  Request to create the review for the item 
//@acesss: Private-> protected route not to the public
const createProductReview = asyncHandler(async (request, response) => {
    const { rating, comment } = request.body;

    const item = await Product.findById(request.params.id);
    
    if(item) {
        const alreadyReviewed = item.reviews.find(r => r.user.toString() === request.user._id.toString());

        if(alreadyReviewed) {
            response.status(400);
            throw new Error ('The product has been already reviewed by the user');
        }

        const review = {
            name: request.user.name, 
            rating: Number(rating),
            comment, 
            user: request.user._id
        }

        item.reviews.push(review);

        item.numReviews = item.reviews.length;

        item.rating = item.reviews.reduce((accumulator, product) => product.rating + accumulator, 0) / item.reviews.length;

        await item.save();
        response.status(201).json({ message: 'The review has been added' });
    }
    else {
        response.status(404);
        throw new Error('The item is not found');
    }
});

export { getProducts, getProductByID, deleteProduct, createProduct, updateProduct, createProductReview };