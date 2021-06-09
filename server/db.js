const mysql = require('mysql2')
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password:'Root@123',
    database : 'bank'

})
module.exports = connection;