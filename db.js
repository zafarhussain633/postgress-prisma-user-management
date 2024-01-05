
//old scoll methods new using prisma  this is not required
// const Pool = require("pg").Pool

// const pool = new Pool({
//     user: "postgres",
//     password:"Zafar1020@",
//     host: "localhost",
//     port: 5432,
//     database: 'postgres'
// })

// if(pool){
//     console.log("database connection established")
// }

// module.exports = pool

// db.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

if (prisma) {
  console.log('Database connection established');
}

module.exports = prisma;
