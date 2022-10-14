const express = require('express');
require("dotenv").config();
const mongoose = require("mongoose");
const PensionerDetail = require("./PensionerDetail");
const PORT = process.env.PORT || 5002;
const amqp = require("amqplib");
const isAuthenticated = require('../auth-service/isAuthenticated');
const app = express();
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/PMS-pensioner-detail-service", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("[PENSIONER_DETAIL-SERVICE] - Connected to database"))
    .catch((err) => {
        console.error(err);
        console.error("[PENSIONER_DETAIL-SERVICE] - DB connection failed!");
    });

let connection, channel;

// get the details by adhaar number
app.get("/:aadhaar", isAuthenticated , async (req, res) => {
    try {

        let aadhaar = req.params.aadhaar;
        const pensioner = await PensionerDetail.findOne({
            aadhaar
        }).lean();

        return res.send({
            success: true,
            pensioner,
            message: 'Pensioner detail'
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error
        })
    }
});

app.listen(PORT, () => {
    console.log(`[PENSIONER_DETAIL-SERVICE] - LIVE AT PORT ${PORT}`);
});