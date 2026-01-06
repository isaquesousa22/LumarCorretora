import mysql from "mysql2";

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"203451is",
    database:"lumarseguros"
});

db.connect(err =>{
    if(err)throw err;
    console.log("Conectando ao mysql");
});