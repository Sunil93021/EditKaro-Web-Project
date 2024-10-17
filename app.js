const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();
const path = require("path");
const port = process.env.PORT;

const app = express();

const emailTxt = ""

app.use(express.static(path.join(__dirname,'static')));
app.use(express.urlencoded({extended: true}));

app.post("/sendMail", async (req, res) => {
    let {email} = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "skaibalya2005@gmail.com",
            pass: process.env.NODEMAILERPASS
        }
    });

    const mailOptions = {
        to: "skaibalya748@gmail.com",
        subject: "Hello",
        text: "Thanks for visting us",
        attachment: [
            {
                filename: "test.pdf",
                path: path.join(__dirname,"pdfs" ,"test.pdf")
            }
        ]
    }

    try{
        let info = await transporter.sendMail(mailOptions);
        res.redirect("/");
    }catch(e){
        console.log(e);
        res.send("error occured");
    }
})

app.listen(port, () => {
    console.log("App is listening on port ",port);
});