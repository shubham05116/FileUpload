const express = require('express');
const app = express();

require("dotenv").config();

app.use(express.json());

const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))


app.listen(process.env.PORT, (req, res) => {
    console.log("started")

})

const dbConnect = require('./config/database');
dbConnect.connect();

const connectcloud = require("./config/cloudinary")
connectcloud.cloudinaryConnect();


const upload = require('./routes/FileUpload');


app.use('/api/v1', upload)
