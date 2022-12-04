const express = require('express')
const cors = require('cors')
const User = require('./config')
const app = express()

// Sessions
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const sevenDay = 1000 * 60 * 60 * 24 * 7;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: sevenDay },
    resave: false
}));
app.use(cookieParser());

app.use(express.json())
app.use(cors())

function loginSession(req, res, msg) {
    try {
        session = req.session;
        session.emailAddress = req.body.emailAddress;
        res.send({ session: session, msg: msg })
    } catch (e) {
        res.send({ session: null, msg: false })
    }
}

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

async function getUsers(emailAddress, password) {
    const snapshot = await User.get();
    let isValid = false;
    snapshot.forEach((doc) => {
        if (doc.data()['emailAddress'] == emailAddress) {
            // Login purpose
            if(password != null){
                if (doc.data()['password'] == password) {
                    // Logged in user
                    isValid = true
                    return true
                }else{
                    // Password unmatched !!!
                    isValid = false
                    return false
                }
            // Registration return
            }else{
                // User exists
                isValid = true
                return isValid;
            }
        }
    });
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

app.post('/loginuser', async (req, res) => {
    const data = req.body
    // Matching if the user exists
    await getUsers(data['emailAddress'], data['password']).then(async (val) => {
        // Login user
        loginSession(req, res, val)
    })
})

app.post('/post', async (req, res) => {
    console.log("Hari Bol")
    // res.redirect("/");
    res.send("Hari Bol")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Running"))