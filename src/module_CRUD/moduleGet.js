let getUser = function( arreiUsers, response) {
   
let stringDB = JSON.stringify(arreiUsers);
response.statusCode = 200;
response.setHeader( "Content-Type", "json/application" );
response.end( stringDB );
};

module.exports.getUser = getUser;

