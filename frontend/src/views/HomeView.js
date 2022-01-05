import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeView = () => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get('/api/products')

            setProducts(data);
        }

        getProducts();
    }, [])

    return (
        <>
         <h1>Newest Toys and Games</h1>   
         <Row>
            {products.map(item => (
                <Col key={item._id} sm={12} md={6} lg={4}>
                    <Product item={item}/>
                </Col>
            ))}
         </Row>
        </>
    )
}

export default HomeView
