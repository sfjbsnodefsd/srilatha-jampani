// console.log("Hello this is Srilatha, I hope you are having a great day! ");

const  http = require('http');

function greet(req,resp) {
    resp.writeHead(200,{'Content-Type':'application/json'});
    resp.write(JSON.stringify({
        "name":"Srilatha",
        "Empid": "101",
        "address":{
            "street":"zxy street",
            "city":"Banglure",
            "State": "Karnataka"
        }
    }))
    resp.end();
}
   
http.createServer(greet).listen(5000);



