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

// @description: Will be updating the order to paid
// @route: GET  Request to getting the order and got to pay
//@acesss: Private-> meaning nobody has access to this 
const updateOrderToPaid = asyncHandler(async (request, response) => {
    const order = await Order.findById(request.params.id);

    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save();

        response.json(updatedOrder);
    } else {
        response.status(404);
        throw new Error('Order not found in the database');
    }

});

// @description: Get the user who is logged in orders and display them
// @route: GET  Request to getting the order and go to myorders
//@acesss: Private-> meaning nobody has access to this 
const getMyOrders = asyncHandler(async (request, response) => {
    const orders = await Order.find({ user: req.user._id });
    response.json(orders);
});


// @description: Get all of the orders for the admin
// @route: GET  Request to getting the order and go to order list 
//@acesss: Private-> meaning nobody has access to this 
const getOrders = asyncHandler(async (request, response) => {
    const orders = await Order.find({}).populate('user', 'id name');
    response.json(orders);
});


export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders };