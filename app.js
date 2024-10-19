const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();
const path = require("path");
const port = process.env.PORT;
let {google} = require("googleapis"); 
const fs = require("fs");
const os = require('os');


const tmpDir = os.tmpdir();
const tmpFilePath = `${tmpDir}/credentials.json`;

const app = express();


if (!fs.existsSync(tmpFilePath)) {
    // Decode and write the credentials only if the file doesn't exist
    const credentials = Buffer.from(process.env.GOOGLECREDENTIALS, 'base64').toString('utf-8');
    fs.writeFileSync(tmpFilePath, credentials);
  }
  

const emailText = `Hello There,

I hope this message finds you well!

As part of our commitment to driving growth and expanding business opportunities, I've put together a document that outlines some targeted strategies and insights. These ideas are tailored to enhance [key areas, e.g., customer engagement, revenue, or operational efficiency] and can offer a pathway for substantial progress.

**Key Highlights:**
1. **Digital Transformation** - Leveraging modern tools to streamline processes and enhance customer experience.
2. **Market Expansion** - Identifying new customer segments and potential regions for expansion.
3. **Customer Retention** - Implementing strategies that boost loyalty and reduce churn.

I've attached a PDF with more detailed information and strategic recommendations. Please feel free to review it at your convenience. I’m looking forward to discussing these ideas in more depth and exploring how we can implement them to accelerate growth.

Thank you, and I look forward to your feedback!

Best regards,  
Our Team  
someone@gmail.com
`

app.use(express.static(path.join(__dirname,'static')));
app.use(express.urlencoded({extended: true}));

// Nodemailer setup
const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "skaibalya2005@gmail.com",
            pass: process.env.NODEMAILERPASS
        }
    });

//Googlesheets setup
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
    keyFile: tmpFilePath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  


// sending mail to the user
app.post("/sendMail", async (req, res) => {
    let {email} = req.body;

    const mailOptions = {
        from: "skaibalya2005@gmail.com",
        to: email,
        subject: "Thanks for visiting us",
        text: emailText,
        attachments: [
            {
                filename: "businessGrowth.pdf",
                path: path.join(__dirname, "static/pdfs", "businessGrowth.pdf")
            }
        ]
    }

    try{
        let info = await transporter.sendMail(mailOptions);
        res.redirect("/");
    }catch(e){
        console.log("Error occured while sending mail: ",e);
        req.send("Some error occured");
    }
});


// add data in goolgesheets  
app.post("/saveUser", async(req, res) => {
    try{
        let {username, email, msg, phone} = req.body;
        const client = await auth.getClient();
        const spreadsheetId = "1iOkJ1DIv8wqF3maCVK6DNrJy3pYN0YzBXbSrosEnJ2w";
        const range = 'Sheet1!A:D';
    
        await sheets.spreadsheets.values.append({
            auth: client,
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[username, email, phone, msg]],
              },
        })
        res.status(200).redirect("/contacts.html");
    }catch(err){
        console.error("Error writing to google sheets: ", err);
        res.send("Error occured");
    }
});

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});