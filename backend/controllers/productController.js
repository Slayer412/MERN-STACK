import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc fetch all the products
//@route GET /api/products
//@access public(anyone can access it without authentication)
const  getProducts = asyncHandler(async (req,res) => {
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {   }

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    //for error testing
    // res.status(401)
    //  throw new Error('NOt Authorized')
    res.json({ products, page, pages: Math.ceil(count / pageSize)});
})

//@desc fetch specific product with id
//@route GET /api/products/:id
//@access public(anyone can access it without authentication)
const  getProductsById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)

    if(product)
        res.json(product);
    else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc DELETE a product
//@route DELETE /api/products/:id
//@access Private/Admin 
const  deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message:'Product Removed'})
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc create a product
//@route POST /api/products
//@access Private/Admin 
const  createProduct = asyncHandler(async (req,res) => {
   const product = new Product({
       name:'sample name',
       price:0,
       user:req.user._id,
       image:'/image/sample.jpg',
       brand:'Sample brand',
       category:'Sample category',
       countInStock: 0,
       numReviews:0,
       description:'sample Description',
   })

   const createdProduct = await product.save()
   res.status(201).json(createdProduct)

})

//@desc update a product
//@route PUT /api/products
//@access Private/Admin 
const  updateProduct = asyncHandler(async (req,res) => {
   
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }
    else{
        throw new Error('Product not found')
    }
 })

 //@desc create new review
//@route PUT /api/products/:id/reviews
//@access Private
const  createProductReview = asyncHandler(async (req,res) => {
   
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0 ) / product.reviews.length

        await product.save()

        res.status(201).json({message: 'Review Added'})
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
 })

//@desc Get Top rated product
//@route PUT /api/products/top
//@access Public
const  getTopProducts = asyncHandler(async (req,res) => {
   const products = await Product.find({}).sort({ rating: -1}).limit(3)

   res.json(products)
 })


export { getProducts, getProductsById, deleteProduct, createProduct, updateProduct,createProductReview, getTopProducts }

