// get the client
import mysql from 'mysql2/promise';

// create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop_my_pham'
});


export default pool;