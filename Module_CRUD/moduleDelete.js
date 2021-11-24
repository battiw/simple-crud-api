let idSlice;
let deleteUser = function( urlPach, arreiUsers, response) {

     idSlice = urlPach.slice( 8 ); //обрезаем строку запроса для выделения id
        let indexDelete = arreiUsers.findIndex( function ( item ) {
        if ( item.id == idSlice );
        return item;
        });
        arreiUsers.splice( indexDelete, 1);
        response.setHeader("Content-Type", "json/application");
        response.statusCode = 200;
        response.write( `DELETE USER in ID => ${idSlice}`);
        response.end();
        return idSlice
    }; 

module.exports.deleteUser = deleteUser;
module.exports.idSlice = idSlice;
