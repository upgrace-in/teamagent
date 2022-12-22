const express = require('express')
const cors = require('cors')
const db = require('./config')
const app = express()
const crypto = require("crypto");

const mailToAdmin = require('./mailSystem/mailAdmin')
const mailToUser = require('./mailSystem/mailUser')
const signupMail = require('./mailSystem/signupMail')

const User = db.collection('Users')

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

// Common Variables
// let loanOfficer = {
//     'Victor Mackliff': 'victormackliff@gmail.com',
//     'Sam zepeda': 'SZepeda@sl-Lending.com',
//     'Gabe Lozano': 'glozano@sl-lending.com',
//     'Chris Miranda': 'cmiranda@sl-lending.com'
// }
let loanOfficer = {
    'Victor Mackliff': 'thedesiretree47@gmail.com',
    'Sam zepeda': 'thedesiretree47@gmail.com',
    'Gabe Lozano': 'thedesiretree47@gmail.com',
    'Chris Miranda': 'thedesiretree47@gmail.com'
}
let liveSiteAdd = "https://teamagentadvantage.upgrace.in/"
let adminMail = "itz.kartik7@gmail.com"



async function loginSession(req, res, data, msg) {
    try {
        // If res doesn't provide emailAddress & name then throw error
        session = req.session;
        session.emailAddress = data['emailAddress'];
        session.name = data['name'];
        // Session admin
        session.admin = false;
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

app.post('/createuser', async (req, res) => {
    const data = req.body
    // Matching if the emailAddress exists
    await getUsers(data['emailAddress'], data['password'])
        .then(async (val) => {
            if (val['response'] === false) {
                // Register User
                const docRef = User.doc(data['emailAddress']);
                await docRef.set(data)
                signupMail(data['emailAddress'], "Successfully Registered", liveSiteAdd)
            }
            // Login user
            loginSession(req, res, val['data'], val['response'])
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
    // Matching if the user exists
    const snapshot = await User.where('emailAddress', '==', data['emailAddress']).get();
    if (snapshot.empty) {
        res.send({ msg: false })
    } else {
        try {
            // Save lead
            User.doc(data['emailAddress']).collection('Leads').add(data)

            // To the Admin
            mailToAdmin(adminMail, "Someone Added A Lead", data, liveSiteAdd)

            if(loanOfficer[data['offerAcceptedStatus']['selectedloanOfficer']] !== undefined){
                // To the loan Officer
                mailToAdmin(loanOfficer[data['offerAcceptedStatus']['selectedloanOfficer']], "Someone Choosed You In A Lead", data, liveSiteAdd)
            }
            
            // To the User
            mailToUser(data['emailAddress'], "Lead been successfully uploaded !!!", data, liveSiteAdd)

            res.send({ msg: true })

        } catch (e) {
            console.log(e)
            res.send({ msg: false })
        }
    }
})

app.get('/fetchLeads', async (req, res) => {
    const data = req.query
    const snapshot = await User.doc(data['emailAddress']).collection('Leads').get()
    if (snapshot.empty) {
        res.send({ msg: false })
    } else {
        let leadData = snapshot.docs.map(doc => doc.data());
        res.send({ msg: true, data: leadData })
    }
})


app.listen(7070, () => console.log("Running"))
