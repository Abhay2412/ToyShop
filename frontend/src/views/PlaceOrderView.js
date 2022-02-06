import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutPlan from '../components/CheckoutPlan';
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';

const PlaceOrderView = (history) => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

  //Calculate the final prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
  cart.productsPrice = addDecimals(cart.cartItems.reduce((currentItem, item) => currentItem + item.price * item.quantity, 0));
  cart.shippingPrice = addDecimals(cart.productsPrice > 75 ? 0 : 10.99);
  cart.taxPrice = addDecimals(Number((0.20  * cart.productsPrice).toFixed(2)));

  cart.totalPrice = (Number(cart.productsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
      if(success) {
          history.pushState(`/order/${order._id}`);
      }
      // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
      dispatch(createOrder({
          orderItems: cart.cartItems, 
          shippingAddress: cart.shippingAddress, 
          paymentMethod: cart.paymentMethod, 
          productsPrice: cart.productsPrice, 
          taxPrice: cart.taxPrice, 
          shippingPrice: cart.shippingPrice, 
          totalPrice: cart.totalPrice,
      }));
  }


  return (
    <>
    <CheckoutPlan plan1 plan2 plan3 plan4 />
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}, {cart.shippingAddress.postalCode}, {' '} 
                        {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Products</Col>
                            <Col>${cart.productsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                     {error && <Message variant='danger'>{error}</Message>}
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <Button type='button' className='w-100' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                            Place Order
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    
    </>
    
    );
};

export default PlaceOrderView;
