import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';

const HomeView = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    return (
        <>
            <h1>Newest Toys and Games</h1>
            {loading ? (
            <Loader />
            ) : error ? (
            <Message variant='danger'> { error }
            </Message>
            ) : (
            <Row>
                {products.map(item => (
                    <Col key={item._id} sm={12} md={6} lg={4}>
                        <Product item={item} />
                    </Col>
                ))}
            </Row>
            )}
        </>
    )
}

export default HomeView
