const getModulTest = require("../src/module_CRUD/moduleGet.js")

let arreiUsers = []

test( "GETtesting", () => {
    expect( getModulTest.getUser( arreiUsers )).toUndefined();
} ); 

