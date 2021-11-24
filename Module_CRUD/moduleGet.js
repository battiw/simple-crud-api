let getUser = function( arreiUsers, response ) {
let stringDB = JSON.stringify(arreiUsers);
response.setHeader("Content-Type", "json/application");
response.statusCode = 200;
response.end(stringDB);
};

module.exports.getUser = getUser;

