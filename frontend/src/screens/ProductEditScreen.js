import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions' 
import * as productActions from '../constants/productConstants'


const ProductEditScreen = ({ match, history }) => {

    const productID = match.params.id 

    const [name,setName] = useState('') 
    const [price,setPrice] = useState(0) 
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success:successUpdate } = productUpdate



    useEffect(() => {
        if(successUpdate){
                dispatch({type:productActions.PRODUCT_UPDATE_RESET})
                history.push('/admin/productlist')
        }
        if(!product.name || product._id !== productID){
                dispatch(listProductDetails(productID))
        } else{
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
        }
        
      
    },[ dispatch, history, productID, product, successUpdate ])

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(updateProduct({
               _id: productID,
               name,
               price,
               image,
               brand,
               category,
               countInStock,
               description,
       }))
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]    
        const formdata = new FormData()
        formdata.append('image', file)
        setUploading(true)

        try{
                const config =  {
                        'Content-Type': 'multipart/form-data'
                }
                const { data } = await axios.post('/api/upload', formdata, config) 
                
                setImage(data)
                setUploading(false)
        }catch(error){
                console.error(error)
                setUploading(false)
        }
    }


    return <>
                <Link to='/admin/productlist' className='btn btn-light my-3'>GO back</Link>
                <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader /> }
                { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
                {loading ? <Loader /> : error ? <Message variant='danger'> </Message> : (
                    <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={ (e) => setName(e.target.value) } ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price} onChange={ (e) => setPrice(e.target.value) } ></Form.Control>
                    </Form.Group>
                
                    <Form.Group controlId='image'>
                        <Form.Label>Product Image</Form.Label>
                            <Form.Control type='text' placeholder='enter Image URL' value={image} onChange={ (e) => setImage(e.target.value) } ></Form.Control>
                            <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                            {uploading && <Loader />}    
                    </Form.Group> 

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='enter Brand' value={brand} onChange={ (e) => setBrand(e.target.value) } ></Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='enter category' value={category} onChange={ (e) => setCategory(e.target.value) } ></Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='countInStock'>
                            <Form.Label>CountInStock</Form.Label>
                            <Form.Control type='number' placeholder='Enter countInStock' value={countInStock} onChange={ (e) => setCountInStock(e.target.value) } ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='enter description' value={description} onChange={ (e) => setDescription(e.target.value) } ></Form.Control>
                    </Form.Group> 

                    <Button type='submit' variant='primary'>
                        Update Product
                    </Button> 
                </Form> 
                ) }
              
            </FormContainer>
        </>
            
    
}

export default ProductEditScreen
