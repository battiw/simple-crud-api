let putUser = function( urlPach, request, arreiUsers, response ) {
    let idSlice = urlPach.slice( 8 ); //обрезаем строку запроса для выделения id
    let validId = /^[0-9a-z]{8}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{12}$/.test(idSlice);

    let elementArrey;
    let dataStrimPut = "";

    request.on( "data", ( chunk ) => {
        dataStrimPut += chunk.toString();
    });
    request.on( "end", () => {

        let strimObjektPut = JSON.parse(dataStrimPut); // парсим строку в объект

        if (validId == true){

            arreiUsers.forEach(( element )  => {
                if ( element.id == idSlice ) {
                    elementArrey = element;
                };
            });

            if ( elementArrey ){
                elementArrey.name = strimObjektPut.name;
                elementArrey.age = strimObjektPut.age;
                elementArrey.hobbies = strimObjektPut.hobbies;
                elementArrey.id = idSlice;

                let outStrimPut = JSON.stringify( elementArrey );
                response.statusCode = 200;
                response.setHeader( "Content-Type", "json/application" );
                response.write( outStrimPut );
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
    });
};

module.exports.putUser = putUser;