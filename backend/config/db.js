import mongoose from 'mongoose'
import colors from 'colors'
const {connect} = mongoose
const  connectdb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.inverse)
    }
    catch(error){
        console.error(`error: ${error}`.red.bold)
        process.exit(1)
    }
}

export default connectdb