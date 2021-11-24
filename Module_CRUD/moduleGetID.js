let stringDB;
let getId = function(urlPach, arreiUsers, response) {
    let idSlice = urlPach.slice(8); //обрезаем строку запроса для выделения id
        let idOdject = arreiUsers.find( function (item) {
            if ( item.id == idSlice ) {
            return item;
            };      
        }); // возвращаем из массива объект с заданным id   
         stringDB = JSON.stringify( idOdject );
           

    
    response.setHeader( "Content-Type", "json/application" );
    response.statusCode = 200;
    response.end( stringDB );

 return stringDB
};
    module.exports.getId = getId;
    module.exports.stringDB = stringDB;
