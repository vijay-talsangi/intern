const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connection = {}
async function dbConnect(){
    if(connection.isConnected){
        console.log("Mongoose already Connected")
        return
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URL||"")
        connection.isConnected = db.connections[0].readyState
        console.log("Mongoose Connected")
    }catch(error){
        console.log("Mongoose Connection failed", error.message);
        process.exit(1)
    }
}
module.exports = dbConnect;