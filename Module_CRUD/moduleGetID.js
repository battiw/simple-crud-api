let stringDB;
let getId = function(urlPach, arreiUsers, response) {
    let idSlice = urlPach.slice(8); //обрезаем строку запроса для выделения id
    let validId = /^[0-9a-z]{8}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{12}$/.test(idSlice);

        if ( validId == true ) {
            let idOdject = arreiUsers.find( function (item) {
                if ( item.id == idSlice ) {
                return item;
                };      
            }); // возвращаем из массива объект с заданным id   
            
            if ( idOdject ) {
                stringDB = JSON.stringify( idOdject );
                response.setHeader( "Content-Type", "json/application" );
                response.statusCode = 200;
                response.end( stringDB );
                return stringDB

            }else {
                response.setHeader( "Content-Type", "json/application" );
                response.statusCode = 404;
                response.write( "The user with the requested ID was not found." );
                response.end();
            }
    
        } else {

            response.setHeader( "Content-Type", "json/application" );
            response.statusCode = 400;
            response.write( "The ID config is not valid!!!\n The user ID must match the UUID." );
            response.end();
        }
};
module.exports.getId = getId;
module.exports.stringDB = stringDB;
