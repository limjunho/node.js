"use strict";

const port = 3000;
const express = require("express");
const app = express();

const mysql = require("mysql");
const connection = mysql.createConnection({ // 연결할 DB 정의
    host : "hostip",
    user : "id",
    password : "passwd",
    database : "test"
});

let sql;
let insert_params;

connection.connect();

// 요청해독을 초기화 (default : utf-8)
app.use(express.urlencoded({extended: false}));

// 요청 해독을 json으로 진행
app.use(express.json());

// 요청 데이터를 분석하는 미들웨어
// 미들웨어란 애플리케이션 로직과의 데이터 교환 전에 대기, 분석, 필터링 및 HTTP통신을 다루는 코드를 일컫는 일반적인 용어
app.use(function(req, res, next){
    console.log(req.body);
    console.log(req.query);

    sql = "INSERT INTO data(number, ssid, dBm) VALUES(?,?,?)"
    insert_params = [, req.query.ssid, req.query.dBm];
    connection.query(sql, insert_params, function(err, rows, fields){
        if(err) console.log(err);
        else console.log("insert success");
    });

    next();
});

// POST 라우트
app.post("/", function(req, res){
    console.log("\npost");

    sql = "SELECT * FROM data";
    connection.query(sql, function(err, rows, fields){
        if(err) console.log(err);
        console.log(rows);
    });

    res.send("HTTP POST Successful");
});

// GET 라우트
app.get("/", function(req, res){
    console.log("\nget");

    
    sql = "SELECT * FROM data";
    connection.query(sql, function(err, rows, fields){
        if(err) console.log(err);
        console.log(rows);
    });

    res.send("HTTP GET Successful");
});

// 서버실행
app.listen(port, function(){
    console.log("Server port : ",port);
});
