import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartView = ({ match, location, history }) => {
    const itemId = match.params.id;

    const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems);

    useEffect(() => {
        if(itemId) {
            dispatch(addToCart(itemId, quantity))
        }
    }, [dispatch, itemId, quantity])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const paymentHandler = () => {
      history.push('/login?redirect=shipping');  
    };
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? ( <Message>Your cart is not filled <Link to='/' style={{ color: '#FFF' }}>Back to Shopping</Link></Message> ) : 
                (<ListGroup variant='flush'>{ cartItems.map(item => (
                    <ListGroup.Item key= {item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>${item.price}</Col>
                            <Col md={2}>
                            <Form.Control as='select' value={item.quantity} onChange={(e) => 
                                 dispatch(addToCart(item.product, Number(e.target.value)))}>
                                     {[...Array(item.countInStock).keys()].map((x) => (
                                         <option key={x + 1} value={x + 1}>
                                             {x + 1}
                                         </option>
                                     ))}
                                 </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}</ListGroup>)}
            </Col>
            <Col md ={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((increment, item) => increment + item.quantity, 0)}) items</h2>
                            ${cartItems.reduce((increment, item) => increment + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='w-100' disabled={cartItems.length === 0} onClick={paymentHandler}>
                                Proceed To Payment
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartView;
