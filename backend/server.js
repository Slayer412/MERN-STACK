import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/db.js'
import colors from 'colors'
import productRoutes from './route/productRoutes.js'
import userRoutes from './route/userRoutes.js '
import orderRoutes from './route/orderRoutes.js '
import uploadRoutes from './route/uploadRoutes.js '
import { notFound, errorHandle } from './middleware/errorMiddleware.js'
import morgan from 'morgan'


const app = express()

//environment variable setup
dotenv.config();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}



app.use(express.json())



//connection to the DB
 connectdb();



app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)  
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal',(req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
    app.get('/',(req,res) => {
        res.send("API running....");
    })
}

app.use(notFound)
app.use(errorHandle)

const port = process.env.PORT || 5000;
app.listen(port,console.log(`listening on ${process.env.NODE_ENV} mode port ${process.env.PORT}`.yellow.bold))

