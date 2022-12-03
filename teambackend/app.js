const express = require('express')
const cors = require('cors')
const User = require('./config')
const app = express()
app.use(express.json())
app.use(cors())

app.post('/create', async(req, res) => {
    const data = req.body
    await User.add(data)
    res.send({msg: 'User Added'})
})

app.post('/post', async(req, res) => {
    console.log("Hari Bol")
    // res.redirect("/");
    res.send("Hari Bol")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Running"))