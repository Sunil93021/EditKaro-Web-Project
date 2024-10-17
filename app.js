const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname,'static')));
app.use(express.urlencoded({extended: true}));

app.post("/sendMail", async (req, res) => {
    let {email} = req.body;
    console.log(email);
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
    }

    try{
        await transporter.sendMail(mailOptions);
        res.redirect("/");
    }catch(e){
        console.log(e)
        res.send("error occured")
    }
})

app.get("/home", (req, res) => {
    res.send("Wokring");
});

app.listen(8080, () => {
    console.log("App is listening on port 8080");
});