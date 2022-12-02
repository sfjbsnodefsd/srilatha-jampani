const express = require("express");
const app = express() ;
const port = 5000

app.get("/", (req, res) => {
    res.send("hello world my name is nishant")
})


app.listen(port, () => {
    console.log('app is listening to ${port}');
})