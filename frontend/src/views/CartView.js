import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Buton, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

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
    return (
        <div>
            Cart
        </div>
    )
}

export default CartView;
