import React,{ useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { updateUser, getUserDetails } from '../actions/userActions' 
import * as userActions from '../constants/userConstants'


const UserEditScreen = ({ match, history }) => {

    const userID = match.params.id 

    const [name,setName] = useState('') 
    const [email,setEmail] = useState('') 
    const [isAdmin, setisAdmin] = useState(false)
    // const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success } = userUpdate

    useEffect(() => {
        if(success){
            dispatch({type: userActions.USER_UPDATE_RESET})
            history.push('/admin/userlist')   
        }
        else{
            if(!user.name || user._id !== userID){
                dispatch(getUserDetails(userID))
            }else{
                setName(user.name)
                setEmail(user.email)
                setisAdmin(user.isAdmin)
            }
        }
      
    },[ user, userID, dispatch, success, history ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: userID, name, email, isAdmin}))
    }


    return <>
                <Link to='/admin/userlist' className='btn btn-light my-3'>GO back</Link>
                <FormContainer>
                <h2>Edit Users</h2>
                {loadingUpdate && <Loader /> }
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'> </Message> : (
                    <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={ (e) => setName(e.target.value) } ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={ (e) => setEmail(e.target.value) } ></Form.Control>
                    </Form.Group>
                    

                    <Form.Group controlId='isAdmin'>
                            <Form.Check type='checkbox' label='isAdmin' value={isAdmin} checked={isAdmin} onChange={ (e) => setisAdmin(e.target.checked) } ></Form.Check>
                    </Form.Group> 

                    <Button type='submit' variant='primary'>
                        Update User
                    </Button> 
                </Form> 
                ) }
              
            </FormContainer>
        </>
            
    
}

export default UserEditScreen
