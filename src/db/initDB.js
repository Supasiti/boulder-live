const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

const databaseName = process.env.DB_NAME;

connection.query(`DROP DATABASE IF EXISTS ${databaseName};`, (err, results) => {
    connection.query(`CREATE DATABASE ${databaseName};`, (err, results) => {
        console.log(err, results)
        process.exit();
    });
});