let putUser = function(urlPach, request, arreiUsers, response ) {

    let idSlice = urlPach.slice( 8 ); //обрезаем строку запроса для выделения id
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

}

module.exports.putUser = putUser;