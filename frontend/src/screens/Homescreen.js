import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Products from '../products'
import Product from '../components/product'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import { listProduct } from '../actions/productActions'
import  Loader  from '../components/Loader'
import  Message  from '../components/Message'
import  Paginate  from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const Homescreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page    } = productList
    
    useEffect(() => {
       dispatch(listProduct(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])

    

    return <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>GO BACK</Link>}
            <h4>LATEST PRODUCTS</h4>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <> 
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row> 
                <Row>
                    <strong className='mr-2 ml-4 pt-1'>Pages:</strong>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </Row>
                
               
            </>
            }
           
        </>
    

}

export default Homescreen
