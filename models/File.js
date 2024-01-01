const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const fileschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    tags: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },


})


//post hook
fileschema.post("save", async function (doc) {
    try {
        console.log(doc);

        //transporter:
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        //send mail:
        let info = await transporter.sendMail({
            from: "shubham",
            to: doc.email,
            subject: "new file uploaded successfully",
            html: `<h1>Hello kya  hala k</h1>`
        })

        console.log(info);

    }
    catch (err) {
        console.log(err);

    }
})

module.exports = mongoose.model("File", fileschema)