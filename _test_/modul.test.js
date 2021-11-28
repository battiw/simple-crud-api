const supertest = require("supertest")
const index = require("../src/index")
// const { v4: uuidv4 } = require( 'uuid' );
// uuidv4();

// SCENARIO
// 1. Get all objects with a GET request (expected empty array)
// 2. POST request creates a new entity (expected response, provided by newly created entity)
// 3. GET request trying to get the created object by its id (expected object)
// 4. We are trying to update the created object with a PUT request (a response is expected, a   created object with the same id)
// 5. DELETE request delete the created object by id (waiting for confirmation of successful deletion)
// 6. A GET request is trying to get a remote object by id (an answer is expected that there is no such object)


let testArr = [];

describe( "CRUD API validation scripts", () => {

    it(`Get all objects with a GET request (expected empty array)`, ( done ) => {
        supertest( index.server ).get( "/person" ).end( ( err, res ) => {
        expect( res.statusCode ).toBe( 200 );
        expect( res.text ).toBe( JSON.stringify([]) );
        done();
        });
    });

    it ( `POST request creates a new entity (expected response, provided by newly created entity)`,  ( done ) => {
        const userinput = {
        "name": "Dima",
        "age": 35,
        "hobbies": ["coding", "cofe"],
        };
        supertest( index.server )
        .post( "/person" )
        .send( userinput )
        .end( ( err, res) => {
            const useroutput = res.text;
            testArr.push( JSON.parse( res.text ));
            expect( res.statusCode ).toBe( 201 );
            expect( res.text ).toEqual( useroutput );
            done();
        });
    });

    it( `GET request trying to get the created object by its id (expected object)`, ( done ) => {
        supertest( index.server )
        .get( `/person/${testArr[0].id}` )
        .end( ( err, res ) => {
            expect( res.statusCode ).toBe( 200 );
            expect( res.text ).toEqual( JSON.stringify( testArr[0] ));
            done();
        });
    });

    it( `We are trying to update the created object with a PUT request (a response is expected, a   created object with the same id)`, ( done ) => {
        const userinputPut = {
            "name": "Valerian",
            "age": 23,
            "hobbies": ["golf", "cosmos"],
            "id": testArr[0].id
            };
        supertest( index.server )
        .put( `/person/${testArr[0].id}` )
        .send( testArr[0] )
        .end( ( err, res ) => {
            testArr[0].name = userinputPut.name;
            testArr[0].age = userinputPut.age;
            testArr[0].hobbies = userinputPut.hobbies;
            testArr[0].id = userinputPut.id;
            
            expect( res.statusCode ).toBe( 200 );
            expect( JSON.stringify( userinputPut )).toEqual( JSON.stringify( testArr[0] ));
            done();
        });
    });

    it ( `DELETE request delete the created object by id (waiting for confirmation of successful deletion)`, ( done ) => {
      
        supertest( index.server )
        .delete( `/person/${testArr[0].id}` )
        .end( ( err, res ) => {

        expect( res.statusCode ).toBe( 204 );
        done();
        });
    });

    it( `A GET request is trying to get a remote object by id (an answer is expected that there is no such object)`, ( done ) => {
        supertest( index.server )
        .get( `/person/${testArr[0].id}` )
        .end( ( err, res ) => {
            expect( res.statusCode ).toBe( 404 );
            expect( res.text ).toEqual( "The user with the requested ID was not found." );
            done();
        });
    });
});

