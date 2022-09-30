const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://localhost:27017/auth-service" , {
    userNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`auth service DB Connected`);
});

// register
app.post("/auth/reg", async(req, res) => {
    const {email, password, name} = req.body;
     
    const userExists = await User.findOne({email});
    if(userExists) {
        return res.json({sucess: 0,
        message:"User already exists"})
    }
    else {
        const newUser = new User({
            name,
            email,
            password
        });
        newUser.save();
    }

});


// login

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ Sucess: 0, message: "User dose not exist" });
    } else {
        if (password !== user.password) {
            return res.json({ sucess: 0, message: "Incorrect password" });
        }
        const payload = {
            email,
            name: user.name,  
        };
        jwt.sign(payload, "secret",(err, token) => {
        if (err) console.log(err);
        else {
            return res.json({ token: token });
        }
       });
    }

});

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Auth service at ${PORT}`);
})