import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';

const ProductDetailedView = ({ history, match }) => {
    const [quantity, setQuantity] = useState(0);
    
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, item } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}? quantity=${quantity}`)
    }

    return (
        <>
        <Link className='btn btn-light my-2' to='/' style={{ backgroundColor: 'transparent', border: 'none' }}>
            Back to Shopping
        </Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : ( <Row>
            <Col md={6}>
                <Image src={item.image} alt={item.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{item.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={item.rating} text={`${item.numReviews} reviews`}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${item.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Overview: {item.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Inventory Status:
                                </Col>
                                <Col style={item.countInStock > 0 ? {color: 'green',} : {color: 'red',}}>
                                {item.countInStock > 0 ? 'In Stock': 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Price:
                                </Col>
                                <Col>
                                <strong>${item.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        
                        {item.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                    Quantity
                                    </Col>
                                    <Col>
                                    <Form.Control as='select' value={quantity} onChange={(e) => 
                                 setQuantity(e.target.value)}>
                                     {[...Array(item.countInStock).keys()].map((x) => (
                                         <option key={x + 1} value={x + 1}>
                                             {x + 1}
                                         </option>
                                     ))}
                                 </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}


                        <ListGroup.Item>
                            <Button onClick = {addToCartHandler} className='w-100' type='button' disabled={item.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>)}
       
        </>
    )
}
export default ProductDetailedView
