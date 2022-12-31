const express = require('express')
const cors = require('cors')
const { db } = require('./config')
const app = express()
const fs = require('fs')
const crypto = require("crypto");

// Multer
const multer = require('multer')
const upload = multer({ dest: 'images/' })

const mailToAdmin = require('./mailSystem/mailAdmin')
const mailToUser = require('./mailSystem/mailUser')
const signupMail = require('./mailSystem/signupMail')

const User = db.collection('Users')
const Lead = db.collection('Leads')
const Receipt = db.collection('Receipts')

// Sessions
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
app.use(sessions({
    secret: crypto.randomBytes(16).toString("hex"),
    saveUninitialized: true,
    resave: false
}));
app.use(cookieParser());

app.use(express.json())
app.use(cors())
// Changed
// let loanOfficer = {
//     'Victor Mackliff': 'victormackliff@gmail.com',
//     'Sam Zepeda': 'SZepeda@sl-Lending.com',
//     'Gabe Lozano': 'glozano@sl-lending.com',
//     'Chris Miranda': 'cmiranda@sl-lending.com'
// }
let loanOfficer = {
    'Victor Mackliff': 'thedesiretree47@gmail.com',
    'Sam Zepeda': 'thedesiretree47@gmail.com',
    'Gabe Lozano': 'thedesiretree47@gmail.com',
    'Chris Miranda': 'thedesiretree47@gmail.com'
}
let liveSiteAdd = "https://teamagentadvantage.upgrace.in"
let adminMail = "thedesiretree47@gmail.com"



async function loginSession(req, res, data, msg) {
    try {
        // If res doesn't provide emailAddress & name then throw error
        session = req.session;
        session.userdata = data;
        res.send({ session: session, msg: msg })
    } catch (e) {
        res.send({ session: null, msg: false })
    }
}


async function getUsers(emailAddress, password) {
    const snapshot = await User.where('emailAddress', '==', emailAddress).get();
    if (snapshot.empty) {
        // If user doesn't exists
        return { response: false, data: {} }
    } else {
        // Email matched...Login Now
        let fData = snapshot.docs[0].data()
        if (fData['password'] === password) {
            // Login user
            return { response: true, data: fData }
        } else {
            // Password unmatched !!!
            return { response: false, data: {} }
        }
    }
}

async function registerOrUpdate(subject, liveSiteAdd, req, res, data, response_status) {
    try {
        await User.doc(data['emailAddress']).set(data)
    } catch (e) {
        res.send({ session: null, msg: false })
    }
    signupMail(data['emailAddress'], subject, liveSiteAdd)
    loginSession(req, res, data, response_status)
}

app.post('/createuser', async (req, res) => {
    const data = req.body
    // Matching if the emailAddress exists
    await getUsers(data['emailAddress'], data['password'])
        .then(async (val) => {
            if (val['response'] === false) {
                // Register User
                registerOrUpdate("Successfully Registered", liveSiteAdd, req, res, {...data, credits: 0}, val['response'])
            } else {
                // Update the data 
                registerOrUpdate("Your account information has been updated successfully !!!", liveSiteAdd, req, res, data, val['response'])
            }
        })
})


app.post('/loginuser', async (req, res) => {
    const data = req.body

    // Matching if the user exists
    await getUsers(data['emailAddress'], data['password']).then(async (val) => {
        // Login user
        loginSession(req, res, val['data'], val['response'])
    })
})

// Leads
app.post('/addLead', async (req, res) => {
    const data = req.body
    try {
        // Save lead
        // User.doc(data['emailAddress']).collection('Leads').add(data)
        await Lead.doc(data.uid).set({ ...data, transaction: "OPEN" })

        // Changed
        // // To the Admin
        // mailToAdmin(adminMail, "Someone Added A Lead", data, liveSiteAdd)

        // if (loanOfficer[data['offerAcceptedStatus']['selectedloanOfficer']] !== undefined) {
        //     // To the loan Officer
        //     mailToAdmin(loanOfficer[data['offerAcceptedStatus']['selectedloanOfficer']], "Someone Choosed You In A Lead", data, liveSiteAdd)
        // }

        // // To the User
        // mailToUser(data['emailAddress'], "Lead been successfully uploaded !!!", data, liveSiteAdd)

        res.send({ msg: true })

    } catch (e) {
        console.log(e)
        res.send({ msg: false })
    }
})

app.get('/fetchLeads', async (req, res) => {
    const data = req.query
    const snapshot = await Lead.where('emailAddress', '==', data['emailAddress']).get();
    if (snapshot.empty) {
        res.send({ msg: false })
    } else {
        let leadData = snapshot.docs.map(doc => doc.data());
        res.send({ msg: true, data: leadData })
    }
})

app.get('/checkUserExists', async (req, res) => {
    const data = req.query
    const snapshot = await User.where('emailAddress', '==', data['emailAddress']).get();
    if (snapshot.empty) {
        res.send({ msg: false })
    } else {
        let data = snapshot.docs.map(doc => doc.data());
        res.send({ msg: true, data: data })
    }
})

//Receipt
app.post('/uploadReceipt', upload.single("img"), async (req, res) => {
    try {
        const data = req.body
        const imagePath = req.file.path
        // Save this data to a database properly
        await Receipt.doc(data.uid).set({...data, imageFile: imagePath})
        res.send({ msg: true })
    } catch (e) {
        console.log(e)
        res.send({ msg: false })
    }
})

app.get('/images/:imageName', (req, res) => {
    // do a bunch of if statements to make sure the user is 
    // authorized to view this image, then
    const imageName = req.params.imageName
    const readStream = fs.createReadStream(`images/${imageName}`)
    readStream.pipe(res)
})

app.get('/fetchReceipts', async (req, res) => {
    const data = req.query
    try {
        const snapshot = await Receipt.where('emailAddress', '==', data['emailAddress']).get();
        if (snapshot.empty) {
            res.send({ msg: false })
        } else {
            res.send({ msg: true, data: snapshot.docs.map(doc => doc.data()) })
        }
    }
    catch (e) {
        console.log(e)
        res.send({ msg: false })
    }
})

app.listen(7070, () => console.log("Running"))
