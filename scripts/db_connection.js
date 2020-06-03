var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "codementAdmin",
    password: "b123456a"
});

con.connect(function(err){
    if(err) throw err;
    console.log("connected!");
});