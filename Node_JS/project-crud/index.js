const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employeedb",
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("sucessful connection ");
    } else 
    console.log("DB connection failed ");
    console.log(err);
});

app.listen(3000, () => console.log("Express server is running at port 3000"));

app.get('/getemployees',(res,req) => {
    mysqlConnection.query("select * from Employee", (err, rows, feilds) => {
        if(!err) {
            console.log(rows);
        } else console.log(err);
    })
})
