const express = require('express')
const cors = require('cors')
const User = require('./config')
const app = express()

app.use(express.json())
app.use(cors())

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
        if (val) {
            res.send({ msg:val })
        } else {
            const docRef = User.doc(data['emailAddress']);
            await docRef.set(data)
            res.send({ msg:val })
        }
    })
})

app.post('/loginuser', async (req, res) => {
    const data = req.body
    // Matching if the user exists
    await getUsers(data['emailAddress'], data['password']).then(async (val) => {
        res.send({msg: val})
    })
})

app.post('/post', async (req, res) => {
    console.log("Hari Bol")
    // res.redirect("/");
    res.send("Hari Bol")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Running"))