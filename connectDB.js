const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/crudDB`)
        console.log("Connect to MongoDB successfully")
       
    } catch (error) {
        console.log("Connect failed " + error.message )
    }
}

module.exports = connectDB


// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(()=>{
//     console.log('Live Db connected')
//     app.listen(PORT, () => {
//         console.log(`Server started on port on http://localhost:${PORT}`);
//     });
    
// }).catch((err)=>{
//     console.log('Db Error', err)

// });