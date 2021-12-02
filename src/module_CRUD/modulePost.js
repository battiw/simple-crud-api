let postUser = function(request, uuidv4, arreiUsers, response ) {

    let dataStrim = "";
    request.on( "data", ( chunk ) => {
        dataStrim += chunk.toString();
    });
    request.on( "end", () => {
        let strimObjekt = JSON.parse(dataStrim); 
        let idU = uuidv4; 
        strimObjekt.id=idU; 

            if ( "name" in strimObjekt &&  "age" in strimObjekt && "hobbies" in strimObjekt ) {

                arreiUsers.push(strimObjekt); 
                let outStrim = JSON.stringify(strimObjekt);
                 
                response.setHeader("Content-Type", "json/application");
                response.statusCode = 201;
                response.write(outStrim);
                response.end();
                return outStrim

            } else {
                response.statusCode = 400;
                response.setHeader("Content-Type", "json/application");
                response.write("Check the entered data !!!");
                response.end();
            };
    });
};

module.exports.postUser = postUser;
