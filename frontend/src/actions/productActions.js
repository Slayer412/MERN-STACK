import * as productActions from '../constants/productConstants'
import axios from 'axios'

export const listProduct = (keyword= '', pageNumber='') => async (dispatch) => {
    try{
        dispatch({type: productActions.PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({
           type: productActions.PRODUCT_LIST_SUCCESS,
           payload: data,   
        }) 
    }
    catch(error){
        dispatch({
            type: productActions.PRODUCT_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: productActions.PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
           type: productActions.PRODUCT_DETAILS_SUCCESS,
           payload: data,   
        }) 
    }
    catch(error){
        dispatch({
            type: productActions.PRODUCT_DETAILS_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: productActions.PRODUCT_DELETE_REQUEST,

        })
        
        const { userLogin: { userInfo } } = getState()
        
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/products/${id}`,config)

        dispatch({
            type:productActions.PRODUCT_DELETE_SUCCESS,
        })
    }
    catch(error){
        dispatch({
            type:productActions.PRODUCT_DELETE_FAILED ,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: productActions.PRODUCT_CREATE_REQUEST,

        })
        
        const { userLogin: { userInfo } } = getState()
        
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/products`,{},config)

        dispatch({
            type:productActions.PRODUCT_CREATE_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type:productActions.PRODUCT_CREATE_FAILED ,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}


export const updateProduct = (product) => async (dispatch, getState) => {
    try{
        dispatch({
            type: productActions.PRODUCT_UPDATE_REQUEST,

        })
        
        const { userLogin: { userInfo } } = getState()
        
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/products/${product._id}` ,product ,config)

        dispatch({
            type:productActions.PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type:productActions.PRODUCT_UPDATE_FAILED ,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}

export const createProductReview = (productID, review) => async (dispatch, getState) => {
    try{
        dispatch({
            type: productActions.PRODUCT_REVIEW_REQUEST,

        })
        
        const { userLogin: { userInfo } } = getState()
        
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

         await axios.post(`/api/products/${productID}/reviews` ,review ,config)

        dispatch({
            type:productActions.PRODUCT_REVIEW_SUCCESS,
          
        })
    }
    catch(error){
        dispatch({
            type:productActions.PRODUCT_REVIEW_FAILED ,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}

export const listTopProducts = () => async (dispatch) => {
    try{
        dispatch({type: productActions.PRODUCT_TOP_REQUEST})

        const {data} = await axios.get(`/api/products/top`)

        dispatch({
           type: productActions.PRODUCT_TOP_SUCCESS,
           payload: data,   
        }) 
    }
    catch(error){
        dispatch({
            type: productActions.PRODUCT_TOP_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}