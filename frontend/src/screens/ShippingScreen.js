import React,{ useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckoutSteps'


const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address) 
    const [city, setCity] = useState(shippingAddress.city) 
    const [pincode, setPincode] = useState(shippingAddress.pincode) 
    const [country, setCountry] = useState(shippingAddress.country) 

    const dispatch = useDispatch() 


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, pincode, country }))
        history.push('/payment')
        
    }

    return <FormContainer>
            <CheckOutSteps step1 step2 />
            <h2>Shipping</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter address' value={address} onChange={ (e) => setAddress(e.target.value) } required ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter city' value={city} onChange={ (e) => setCity(e.target.value) } required ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control type='text' placeholder='Enter pincode' value={pincode} onChange={ (e) => setPincode(e.target.value) } required ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>country</Form.Label>
                    <Form.Control type='text' placeholder='Enter country' value={country} onChange={ (e) => setCountry(e.target.value) } required ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>

            </Form>
        </FormContainer>
    
}


export default ShippingScreen
