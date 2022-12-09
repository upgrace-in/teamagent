const express = require('express')
const cors = require('cors')
const db = require('./config')
const app = express()
const crypto = require("crypto");

const User = db.collection('Users')
const Lead = db.collection('Leads')

// Sessions
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { read } = require('fs');
const sevenDay = 1000 * 60 * 60 * 24 * 7;
app.use(sessions({
    secret: crypto.randomBytes(16).toString("hex"),
    saveUninitialized: true,
    resave: false
}));
app.use(cookieParser());

app.use(express.json())
app.use(cors())

function loginSession(req, res, msg) {
    try {
        session = req.session;
        session.emailAddress = req.body.emailAddress;
        // Session admin
        session.admin = false;
        res.send({ session: session, msg: msg })
    } catch (e) {
        res.send({ session: null, msg: false })
    }
}

async function getUsers(emailAddress, password) {
    const snapshot = await User.where('emailAddress', '==', emailAddress).get();
    let isValid = false;
    if (snapshot.empty) {
        return isValid
    } else {
        snapshot.forEach((doc) => {
            if (doc.data()['emailAddress'] == emailAddress) {
                // Login purpose
                if (password != null) {
                    if (doc.data()['password'] == password) {
                        // Login user
                        isValid = true
                        return true
                    } else {
                        // Password unmatched !!!
                        isValid = false
                        return false
                    }
                    // Registration return
                } else {
                    // User exists
                    isValid = true
                    return isValid;
                }
            }
        });
    }
    return isValid;
}

app.post('/createuser', async (req, res) => {
    const data = req.body
    // Matching if the emailAddress exists
    await getUsers(data['emailAddress'], null).then(async (val) => {
        if (!val) {
            // Register User
            const docRef = User.doc(data['emailAddress']);
            await docRef.set(data)
        }
        // Login user
        loginSession(req, res, val)
    })
})

app.post('/addLead', async (req, res) => {
    const data = req.body
    // Matching if the user exists
    const snapshot = await User.where('emailAddress', '==', data['emailAddress']).get();
    if (snapshot.empty) {
        res.send({ msg: false })
    } else {
        // Save lead
        User.doc(data['emailAddress']).collection('Leads')
        .add({
            name: req.body.name,
            loadAmt: req.body.loadAmt,
            inputAddress: req.body.inputAddress,
            selectedloadOfficer: req.body.selectedloadOfficer,
            approved: false
        })
        res.send({ msg: true })
    }
})

app.get('/addLead', async (req, res) => {
    const data = req.body
    // Matching if the user exists
    const snapshot = await User.where('emailAddress', '==', data['emailAddress']).get();
    if (snapshot.empty) {
        res.send({ msg: false })
    } else {
        // Save lead
        User.doc(data['emailAddress']).collection('Leads')
        .add({
            name: req.body.name,
            loadAmt: req.body.loadAmt,
            inputAddress: req.body.inputAddress,
            selectedloadOfficer: req.body.selectedloadOfficer,
            approved: false
        })
        res.send({ msg: true })
    }
})

app.post('/loginuser', async (req, res) => {
    const data = req.body
    // Matching if the user exists
    await getUsers(data['emailAddress'], data['password']).then(async (val) => {
        // Login user
        loginSession(req, res, val)
    })
})

app.listen(9000, () => console.log("Running"))