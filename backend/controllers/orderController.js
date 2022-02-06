import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @description: Will be making new orders in the datbase
// @route: POST  Request to the new order
//@acesss: Private-> meaning nobody has access to this 
const addOrderItems = asyncHandler(async (request, response) => {
    const { orderitems, shippingAddress, paymentMethod, productsPrice, taxPrice, 
    shippingPrice, totalPrice, } = request.body;

    if(orderitems && orderitems.length === 0) {
        response.status(400);
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            orderitems, user: request.user._id, shippingAddress, paymentMethod, productsPrice, taxPrice, 
            shippingPrice, totalPrice,
        });

        const makedOrder = await order.save();

        response.status(201).json(makedOrder);
    }
});

// @description: Will be getting the order by it's ID
// @route: GET  Request to getting the order 
//@acesss: Private-> meaning nobody has access to this 
const getOrderById = asyncHandler(async (request, response) => {
    const order = await Order.findById(request.params.id).populate('user', 'name email');

    if(order) {
        response.json(order);
    } else {
        response.status(404);
        throw new Error('Order not found in the database');
    }

});



export { addOrderItems, getOrderById };