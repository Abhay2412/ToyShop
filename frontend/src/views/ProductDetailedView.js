import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductDetailedView = ({ match }) => {
    const item = products.find(p => p._id === match.params.id)
    return (
        <>
        <Link className='btn btn-light my-2' to='/' style={{opacity: 0}}>
            Back to Shopping
        </Link>
        <Row>
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

                        <ListGroup.Item>
                            <Button className='w-100' type='button' disabled={item.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}
export default ProductDetailedView
