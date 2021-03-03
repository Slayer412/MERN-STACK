import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const product = ( { product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                 <Card.Img src={product.image} varient='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}> 
                    <Card.Text as="div">
                        <strong>{product.name}</strong>
                    </Card.Text>
                </Link>

                <Card.Text as="div">
                    <Rating value={product.rating} 
                    text={`${product.numReviews}  reviews`}/>
                </Card.Text>

                <Card.Text as="h5">$
                <span className="ml-1" id='pr'>{product.price}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default product
