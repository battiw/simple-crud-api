let idSlice;
let deleteUser = function( urlPach, request, arreiUsers, response) {
    let idSlice = urlPach.slice( 8 ); 
    let validId = /^[0-9a-z]{8}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{12}$/.test(idSlice);

    let elementArrey;
    let elementIndex;

    if (validId == true){

        arreiUsers.forEach(( element, index )  => {
            if ( element.id == idSlice ) {
                elementArrey = element;
                elementIndex = index;
            };
        });

        if ( elementArrey ){
            arreiUsers.splice( elementIndex, 1 );
            response.statusCode = 204;
            response.setHeader( "Content-Type", "json/application" );
            response.end();

        } else {
            response.statusCode = 404;
            response.setHeader( "Content-Type", "json/application" );
            response.write( "The user with the requested ID was not found." );
            response.end();
        };

    } else {
        response.statusCode = 400;
        response.setHeader( "Content-Type", "json/application" );
        response.write( "The ID config is not valid!!!\n The user ID must match the UUID." );
        response.end();
    };
};

module.exports.deleteUser = deleteUser;
module.exports.idSlice = idSlice;
