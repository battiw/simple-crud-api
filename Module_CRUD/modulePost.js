
let outStrim
let postUser = function(request, uuidv4, arreiUsers, response ) {
    let dataStrim = "";
    request.on( "data", ( chunk ) => {
        dataStrim += chunk.toString();
    });
    request.on( "end", () => {
        let strimObjekt = JSON.parse(dataStrim); // парсим строку в объект
        let idU = uuidv4; // создаем id
        strimObjekt.id=idU; //вставляем его в объект 1 номером
        arreiUsers.push(strimObjekt); // добавляем объект в массив
         outStrim = JSON.stringify(arreiUsers);
         
        response.setHeader("Content-Type", "json/application");
        response.statusCode = 200;
        response.write(outStrim);
        response.end();
    });
    return outStrim
}

module.exports.postUser = postUser;
module.exports.outStrim = outStrim;
