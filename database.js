const { response } = require('express');
const {Pool}=require('pg');
const pool=new Pool({
    user:"postgres",
    password:'123456789',
    host:'localhost',
    port:5432,
    database:'clubmanagement'
})
  

// <-------------------------------------Database TABLE -------------------------------->


// const logindatabase=`CREATE DATABASE ClubManagement`;
// try{
// pool.query(logindatabase).then((response)=>{
// console.log("Database created")
// console.log(response)
// })
// }catch(err){
//     console.log(err)
// }



// <-------------------------------------REGISTER TABLE -------------------------------->


// const registertable=`CREATE TABLE IF NOT EXISTS registerdatas(
//         user_id SERIAL PRIMARY KEY,
//         roll_no INT UNIQUE NOT NULL,
//         proper_roll VARCHAR(100) NOT NULL,
//         name VARCHAR(50) NOT NULL,
//         email VARCHAR(100) UNIQUE NOT NULL,
//         phone_number VARCHAR(15) NOT NULL,
//         address VARCHAR(100),
//         password VARCHAR(64) UNIQUE NOT NULL,
//         CHECK (proper_roll IN ('Admin', 'Manager'))

// )`

// const todotable=`CREATE TABLE IF NOT EXISTS tododetails(
//         appliances VARCHAR(50) NOT NULL,
//         amount INT NOT NULL
// )`

// const createstududentable=`CREATE TABLE IF NOT EXISTS studentdetail (
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     year INT NOT NULL,
//     club VARCHAR(50) NOT NULL,
//     phone_no VARCHAR(15),
//     designation VARCHAR(50) NOT NULL,
//     gender VARCHAR(10) NOT NULL,
//     branch VARCHAR(50) NOT NULL,
//     PRIMARY KEY (year, club),
//     CHECK (club IN ('vpaksh', 'ecell', 'tedxkiet', 'innogeeks')),
//     CHECK (designation IN ('president', 'vice-president', 'member')),
//     CHECK (gender IN ('male', 'female')),
//     CHECK (branch IN ('cs', 'civil', 'mechanical', 'electronics'))
// )`



// <-------------------------------------Login TABLE -------------------------------->


// const logintable=`CREATE TABLE IF NOT EXISTS logindatas(
//        email VARCHAR(100)  NOT NULL,
//        password VARCHAR(64)  NOT NULL

// )`

// const createstududentable=`CREATE TABLE IF NOT EXISTS guidedetails (
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     department VARCHAR(255) NOT NULL,
//     club VARCHAR(50) NOT NULL,
//     gender  VARCHAR(50) NOT NULL,
//     phone_no VARCHAR(15),
//     CHECK (club IN ('vpaksh', 'ecell', 'tedxkiet', 'innogeeks')),
//     CHECK (gender IN ('male', 'female')),
//     alloted_money INT NOT NULL
// )`





// try{
//     pool.query(todotable).then((response)=>{
//         console.log("Todo Table Done");
//         console.log(response)
//     })

// }catch(err){
//     console.log(err)

// }

module.exports=pool;