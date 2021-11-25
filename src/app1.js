const http = require("http");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require( 'uuid' );
const deleteModule = require("../Module_CRUD/moduleDelete")
const getModuleID = require("../Module_CRUD/moduleGetID")
const postModule = require("../Module_CRUD/modulePost")
const getModule = require("../Module_CRUD/moduleGet")
const putModule = require("../Module_CRUD/modulePut")

dotenv.config();
uuidv4();
const PORT = process.env.PORT;

 let arreiUsers = []; // массив users
 let idSearch = []; // массив id
const server = http.createServer(( request, response ) => {
 
    idSearch.push( uuidv4() ); // находим в массиве id и заносим их в массив
    
    if ( request.url === '/person' ) {

        if ( request.method === "GET") {
            getModule.getUser( arreiUsers, response );
                
        } else if( request.method === "POST" ) {
            postModule.postUser( request, uuidv4(), arreiUsers, response );

        }; 
    } else if ( request.url.startsWith( '/person/' ) && request.method === "GET" ) {
        getModuleID.getId( request.url, arreiUsers, response );
      
    } else if ( request.url.startsWith('/person/' ) && request.method === "DELETE" ) {
        deleteModule.deleteUser( request.url, request, arreiUsers, response );

    } else if ( request.url.startsWith( '/person/' ) && request.method === "PUT" ) {
        putModule.putUser(request.url, request, arreiUsers, response);

    } else {
        console.log ("ERROR"); 
        response.setHeader( "Content-Type", "json/application" );
        response.statusCode = 404;
        response.write( "ERROR" );
        response.end();
    };
}).listen( PORT, () => { console.log( `Server started PORT => ${PORT}` ) });
