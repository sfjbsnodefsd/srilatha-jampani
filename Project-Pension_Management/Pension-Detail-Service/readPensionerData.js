const mongoose = require("mongoose");
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
let PensionerDetail = require('./pensionerDetail');
const csv2json = require('csvjson-csv2json');
let fs = require("fs");

let file = "pensionerDataList.csv";

let json = fs.readFileSync(file, "utf8");
json = csv2json(json, {
    parseNumbers: true
});
console.log(json);

(async () => {
    for (let data of json) {
        try {
            await PensionerDetail.create({
                name: data.Name,
                dob: data.DOB,
                pan: data.PAN,
                salary_earned: data.SalaryEarned,
                allowances: data.Allowances,
                classification: data.classifications,
                "bank_detail.bank_name": data.BankName,
                "bank_detail.account_number": data.AccountNumber,
                "bank_detail.bank_type": data.BankType,
                aadhaar: data.Adhaar
            })
        } catch (error) {
            console.error(error);
        }
    }
})();