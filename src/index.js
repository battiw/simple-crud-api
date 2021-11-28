const http = require("http");
const { v4: uuidv4 } = require( 'uuid' );
const deleteModule = require("./module_CRUD/moduleDelete")
const getModuleID = require("./module_CRUD/moduleGetID")
const postModule = require("./module_CRUD/modulePost")
const getModule = require("./module_CRUD/moduleGet")
const putModule = require("./module_CRUD/modulePut")

uuidv4();

 let arreiUsers = []; // массив users
//  let idSearch = []; // массив id

const server = http.createServer(( request, response ) => {

    let sampleID = /^\/person\/[0-9a-z]{8}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{12}$/.test( request.url );
    
    try {
       // throw new Error () при проверки 500 ошибки необходимо раскоментировать

            if ( request.url === '/person' ) {
                    if ( request.method === "GET" ) {
                        getModule.getUser( arreiUsers, response );

                    } else if( request.method === "POST" ) {
                        postModule.postUser( request, uuidv4(), arreiUsers, response );
                    }; 
            
            } else if ( request.url.startsWith( '/person/') &&  sampleID == true) {

                    if ( sampleID == true ) {
                        
                        if (  request.method === "GET" ) {
                            getModuleID.getId( request.url, arreiUsers, response );

                        } else if ( request.method === "DELETE" ) {
                            deleteModule.deleteUser( request.url, request, arreiUsers, response );

                        } else if ( request.method === "PUT" ) {
                            putModule.putUser(request.url, request, arreiUsers, response);
                        };
                
                    } else {
                        response.setHeader( "Content-Type", "json/application" );
                        response.statusCode = 405;
                        response.write( "The entered ID was not found!" );
                        response.end();
                    };

            } else {
                response.statusCode = 406;
                response.setHeader( "Content-Type", "json/application" );
                response.write( "You entered a request for a non-existent resource. Check the URL." );
                response.end();
            };

    } catch( err ) {
        response.statusCode = 500;
        response.setHeader( "Content-Type", "json/application" );
        response.write( "Server Error" );
        response.end();
    };
});

module.exports.server = server;
module.exports.uuidv = uuidv4;













