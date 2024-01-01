const mongoose = require('mongoose');

require("dotenv").config();

exports.connect= ()=>{
    mongoose.connect(process.env.MONGODB_URL, {})
    .then(()=>console.log("Connection DB successfully established"))
    .catch(()=>console.log("Connection failed"))
}