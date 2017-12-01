var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app =express();

app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-type, X-Requested-With, X-CSRF-Token');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var tmp;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "banking"
});
app.get('/',function (req,res) {
   res.send('Hello');
});


app.post('/AddData',function (req,res) {
    var sql ="INSERT INTO `account`(`account_number`, `branch_name`, `balance`) VALUES ('"+req.body.number+"','"+req.body.name+"',"+req.body.balance+") ";
    con.query(sql,function (err,rows) {
            if(err) throw err;
            res.json('Add data ');
        });
    });
// เรียกแสดง
app.get('/showData',function (req,res) {
var sql = "select * from account";
con.query(sql,function (err,rows) {
    res.json(rows);

    });
});

// ค้นหา
app.get('/getAccount/:id',function (req,res) {

    var sql = "SELECT `account_number`, `branch_name`, `balance` FROM `account` WHERE account_number ='"+req.params.id+"'";
    con.query(sql,function (err,rows) {
        if(err) throw err;
        res.json(rows);

    });
});
//ลบข้อมูล
app.delete('/delete/:id',function (req,res) {

    var sql = "DELETE FROM `account" +
        "` WHERE account_number  ='"+req.params.id+"'";
    con.query(sql,function (err,rows) {
        if(err) throw err;
        res.json('Delete success');

    });
});
//อับเดตข้อมูล
app.put('/updateData',function (req,res) {
    var number = req.body.account_number;
    var bal = req.body.balance;

    var sql ="UPDATE `account` SET `balance`= '"+bal+"' where account_number = '"+number+"' ";
    con.query(sql,function (err,rows) {
        if(err) throw err;
        res.json('Update success');
    });
});


app.listen(3000,function () {
   console.log('server running at localhot:3000')
});
