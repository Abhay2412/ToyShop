import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductDetailedView = ({ history, match }) => {
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, item } = productDetails;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { success:successProductReview, error:errorProductReview } = productReviewCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(successProductReview) {
            alert('Review Submitted Successfully');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}? quantity=${quantity}`);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }));
    }

    return (
        <>
        <Link className='btn btn-light my-2' to='/' style={{ backgroundColor: 'transparent', border: 'none' }}>
            Back to Shopping
        </Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : ( 
        <>
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
        </Row>
        <Row>
            <Col md={6}>
                <h2>Customer Reviews</h2>
                {item.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                    {item.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating}/>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                        {userInfo ? (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Decent</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as='textarea' row='4' value={comment} onChange={(e) => setComment(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Submit the Review
                            </Button>
                        </Form>
                        
                        ) : <Message>Please <Link to='/login' style={{ color: '#FFF' }}>login in</Link> to write a review for the product
                        {' '}
                        </Message>}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
        )}
       
        </>
    )
}
export default ProductDetailedView
