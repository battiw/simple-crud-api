const db = require("./db")
const { parse } = require('querystring');
const fs = require("fs");
const url = require("url");
const http = require("http");
const path = require("path")
const dotenv = require("dotenv");
const { v4: uuidv4 } = require( 'uuid' );

dotenv.config();
console.log(process.env.PORT)
console.log(process.env.NODE_ENV)

const PORT = process.env.PORT

uuidv4()
for (let i=0; i <= 10; i++){
    console.log(uuidv4())
};

let p = path.resolve('db.js');
console.log(`db => ${p}`)

const server = http.createServer(( request, response ) => {
    if ( request.url === '/person') {
        if  ( request.method === "GET" ) {
            let stringDB = JSON.stringify(db.dbUsers);
            console.log(`stringDB => ${stringDB}`)
            console.log(`stringDB => ${typeof stringDB}`)
            response.setHeader("Content-Type", "json/application");
            response.statusCode = 200;
            response.end(stringDB);
                
        } else if( request.method === "POST" ) {
            console.log("hello")
            fs.access(p, fs.constants.R_OK, err => {
                if(err){
                    response.statusCode = 404;
                    response.end("File not found!");
                } else {
                    let dataStrim = "";
                    request.on( "data", ( chunk ) => {
                    dataStrim += chunk.toString();
                    });
                    request.on( "end", () => {
                    console.log(`dataStrim => ${dataStrim}`);
                    console.log(`dataStrim => ${typeof dataStrim}`);
                    console.log(`db.dbUsers => ${db.dbUsers}`);
                    console.log(`db.dbUsers => ${JSON.stringify( db.dbUsers)}`);
                    console.log(`db.dbUsers => ${typeof db.dbUsers}`);
                    let dS = JSON.parse(dataStrim)
                    console.log(`dS => ${dS}`);
                   console.log(` JSON.parse(dS) => ${JSON.stringify(dS)}`)
                    console.log(`dS => ${typeof dS}`);

                    let newArrei = db.dbUsers.push(dS)
                    console.log(`finishd=> ${db.dbUsers}`)
                    console.log(`finishd1=> ${JSON.stringify(db.dbUsers)}`)

                    response.setHeader("Content-Type", "json/application");
                    response.statusCode = 200;
                    response.end(dataStrim);
  
                    })
                
                }
            })
        } 
    }   
}).listen(PORT, () => {console.log(`Server started PORT => ${PORT}`)});








