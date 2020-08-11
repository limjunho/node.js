"use strict";

const mysql = require("mysql");

const connection = mysql.createConnection({ //연결할 DB정의
    host : "203.250.33.100", // 연결할 host ip 주소
    user : "inlab", // DB 사용자 이름
    password : "@inlab515", // 사용자 패스워드
    database : "test" // 사용할 DB 이름
});

let sql; // DBMS로 전송할 SQL문 (CRUD작업)
let insert_params;

connection.connect();

// 기존에 User테이블에 저장된 데이터 확인
sql = "SELECT * FROM data";
connection.query(sql, function(err, rows, fields){
if(err) console.log(err);
console.log(rows);
});

// 새로운 데이터 삽입
sql = "INSERT INTO data(number, ssid, dBm) VALUES(?,?,?)"
insert_params = [,"inlab_5G", "-38"];

connection.query(sql, insert_params, function(err, rows, fields){
    if(err) console.log(err);
    else console.log("insert success");
});


// User테이블에 저장된 모든 데이터 확인
sql = "SELECT * FROM data";

connection.query(sql, function(err, rows, fields){
    if(err) console.log(err);
    console.log(rows);
});
connection.end();
