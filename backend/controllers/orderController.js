import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @description: Will be making new orders in the datbase
// @route: POST  Request to the new order
//@acesss: Private-> meaning nobody has access to this 
const addOrderItems = asyncHandler(async (request, response) => {
    const { orderItems, shippingAddress, paymentMethod, productsPrice, taxPrice, 
    shippingPrice, totalPrice } = request.body;

    if(orderItems && orderItems.length === 0) {
        response.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems, user: req.user._id, shippingAddress, paymentMethod, productsPrice, taxPrice, 
            shippingPrice, totalPrice
        })

        const makedOrder = await order.save();

        response.status(201).json(makedOrder);
    }
})

export { addOrderItems };