import React from 'react';
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products';

const HomeView = () => {
    return (
        <>
         <h1>Newest Toys and Games</h1>   
         <Row>
            {products.map(item => (
                <Col sm={12} md={6} lg={4}>
                    <Product item={item}/>
                </Col>
            ))}
         </Row>
        </>
    )
}

export default HomeView
