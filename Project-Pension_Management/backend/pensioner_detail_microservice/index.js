const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const PensionerDetail = require("./PensionerDetail");
const PORT = process.env.PORT || 5002;
const amqp = require("amqplib");
const utils = require("./utils");
const isAuthenticated = require("../isAuthenticated");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/PMS-pensioner_detail-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("[PENSIONER_DETAIL-SERVICE] - Connected to database"))
  .catch((err) => {
    console.error(err);
    console.error("[PENSIONER_DETAIL-SERVICE] - DB connection failed!");
  });

app.get("/pensioner/:aadhaar",isAuthenticated, async (req, res) => { 

  const { aadhaar } = req.params;
  try {
    const doc = await PensionerDetail.findOne({ aadhaar: aadhaar });
    if(!doc) {
      throw new Error('No data found for provided aadhaar number');
    }
    if(!utils.validatePensionerDetailObject(doc)) {
      throw new Error('Corrupted data');
    }
    res.status(200).json({
      success: 1,
      pensioner: doc,
    });
  } catch (err) {
    err = err.toString();
    res.status(500).json({
      success: 0,
      err: err.split('Error:')[1],
    });
  }
});

// add a new pensioner
app.post("/pensioner",isAuthenticated, (req, res) => {
  const {
    name,
    dob,
    pan,
    aadhaar,
    salary_earned,
    allowances,
    classification,
    bank_detail,
  } = req.body;

  const newPensioner = new PensionerDetail({
    name,
    dob,
    pan,
    aadhaar,
    salary_earned,
    allowances,
    classification,
    bank_detail,
  });

  newPensioner
    .save()
    .then((r) =>
      res.status(200).json({ success: 1, createdPensioner: newPensioner })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ success: 0, message: "Some error occured", err: err })
    );
});

app.listen(PORT, () => {
  console.log(`[PENSIONER_DETAIL-SERVICE] - LIVE AT PORT ${PORT}`);
});
