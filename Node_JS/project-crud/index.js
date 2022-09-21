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

//get all employees
app.get('/getemployees',(res,req) => {
    mysqlConnection.query("select * from Employee", (err, rows, feilds) => {
        if(!err) {
            console.log(rows);
        } else console.log(err);
    })
})

// get employee by id
app.get('/getemployee/:id', (req,res) => {
    mysqlConnection.query("select * from Employee where EmpID= ?", [req.params.id], (err, rows,fields) => {
        if(!err) {
            console.log(rows);
        }else console.log(err);
    })
})

//delete employee by id
app.delete("/deleteemployee/:id" , (req, res) => {
    mysqlConnection.query("Delete from Employee where EmpID= ?" , [req.params.id], (err,rows,fields) => {
        if(!err) {
            res.send("employee deleted sucessfully")
        }else console.log(err);
    })
})
