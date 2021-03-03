import React,{ useState, useEffect  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import axios from 'axios'
// import products from '../products'
import * as productActions from '../constants/productConstants'
import Meta from '../components/Meta'

const Productscreen = ({ history, match }) => {
    // const product = products. find((p) => p._id === match.params.id)
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error:errorReview, success: successReview } = productReviewCreate

    useEffect(() => {
        if(successReview)
        {
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({ type: productActions.PRODUCT_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    },[ dispatch, match, successReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, { rating, comment }))
    }

    return (
        <>
           <Link className='btn btn-light my-4' to='/'>Go Back</Link> 
           {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
           (
            <>
                <Meta title={product.name} />
                <Row>
                <Col md={6}>
                <Image src={product.image} alt={product.name} fluid></Image>
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h5>{product.name}</h5>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                        </ListGroupItem>

                        <ListGroup className='my-3' style={{fontSize:"large"}}>
                            <strong>Price: ${product.price}</strong>
                        </ListGroup>

                        <ListGroup className="my-2">
                            Description: {product.description}
                        </ListGroup>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price: 
                                    </Col>

                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status: 
                                    </Col>

                                    <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock" }
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>qty</Col>
                                            <Col>
                                                <Form.Control as="select" value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                                {[...Array(product.countInStock).keys()].map(x => (<option key={x+1} > {x+1}</option>))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                            )}

                            <ListGroupItem>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>

                </Col>
            </Row> 

            <Row>
                <Col md={6}>
                    <h3>Reviews</h3>
                    {product.reviews.length === 0 && <Message>NO reviews </Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong> {review.name}</strong>
                                <Rating value={review.rating} />
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h3>Write comment</h3>
                            {errorReview && <Message variant='danger'>{errorReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='4' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form>
                            ) : <Message>Please <Link to='/login'>Click here</Link> to write a review</Message> }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
           )
        }     
         
        </>
    )
}

export default Productscreen