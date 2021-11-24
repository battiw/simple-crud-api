// const { parse } = require('querystring');
const fs = require("fs");
const url = require("url");
const http = require("http");
const path = require("path")
const dotenv = require("dotenv");
const { v4: uuidv4 } = require( 'uuid' );

dotenv.config();
uuidv4();
const PORT = process.env.PORT;
console.log(PORT)

 let arreiUsers = []; // массив users
 let idSearch = []; // массив id
const server = http.createServer(( request, response ) => {
 
    idSearch.push(uuidv4()); // находим в массиве id и заносим их в массив
    
    if ( request.url === '/person') {

        if ( request.method === "GET") {
            let stringDB = JSON.stringify(arreiUsers);
            response.setHeader("Content-Type", "json/application");
            response.statusCode = 200;
            response.end(stringDB);
                
        } else if( request.method === "POST" ) {
            
            let dataStrim = "";
            request.on( "data", ( chunk ) => {
            dataStrim += chunk.toString();
            });
            request.on( "end", () => {
            let strimObjekt = JSON.parse(dataStrim); // парсим строку в объект
            let idU = uuidv4(); // создаем id
            strimObjekt.id=idU; //вставляем его в объект 1 номером
            arreiUsers.push(strimObjekt); // добавляем объект в массив
            let outStrim = JSON.stringify(arreiUsers);
            response.setHeader("Content-Type", "json/application");
            response.statusCode = 200;
            response.write(outStrim);
            response.end();
            });
        }; 

    } else if ( request.url.startsWith( '/person/' ) && request.method === "GET" ) {

        let idSlice = request.url.slice(8); //обрезаем строку запроса для выделения id
        let idOdject = arreiUsers.find( function (item) {
            if ( item.id == idSlice ) {
            return item;
            };      
        }); // возвращаем из массива объект с заданным id   
        let stringDB = JSON.stringify( idOdject );
        response.setHeader( "Content-Type", "json/application" );
        response.statusCode = 200;
        response.end( stringDB );
      
    } else if (request.url.startsWith('/person/') && request.method === "DELETE" ) {
            
        let idSlice = request.url.slice( 8 ); //обрезаем строку запроса для выделения id
        let indexDelete = arreiUsers.findIndex( function ( item ) {
        if ( item.id == idSlice );
        return item;
        });
        arreiUsers.splice( indexDelete, 1);
        response.setHeader( "Content-Type", "json/application" );
        response.statusCode = 200;
        response.end( `DELETE USER in ID => ${idSlice}` );

    } else if ( request.url.startsWith( '/person/' ) && request.method === "PUT" ) {

        let idSlice = request.url.slice( 8 ); //обрезаем строку запроса для выделения id
        let dataStrimPut = "";
            request.on( "data", ( chunk ) => {
            dataStrimPut += chunk.toString();
        });
        request.on( "end", () => {
            let strimObjektPut = JSON.parse( dataStrimPut ); // парсим строку в объект
            let arreyPut = arreiUsers.map( function( item ) {
                if ( item.id == idSlice ) {
                    item.name = strimObjektPut.name;
                    item.age = strimObjektPut.age;
                    item.hobbies = strimObjektPut.hobbies;
                };
                    return item;
                }); 
            let outStrimPut = JSON.stringify( arreyPut );
            response.setHeader( "Content-Type", "json/application" );
            response.statusCode = 200;
            response.write( outStrimPut );
            response.end();
        });
    } else {

        console.log ("ERROR") 
        response.setHeader( "Content-Type", "json/application" );
        response.statusCode = 404;
        response.write( "ERROR" );
        response.end();

    };
}).listen( PORT, () => { console.log( `Server started PORT => ${PORT}` ) });
