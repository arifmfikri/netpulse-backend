const request = require("supertest");

const app = require("../src/app");


describe("Incident API", () => {

    test(
        "GET incidents tanpa JWT harus 401",
        async () => {

            const response = await request(app)
                .get("/api/incidents");

            expect(response.statusCode).toBe(401);

        }
    );


    test(
        "GET incident berdasarkan ID tanpa JWT harus 401",
        async () => {

            const response = await request(app)
                .get("/api/incidents/1");

            expect(response.statusCode).toBe(401);

        }
    );


    test(
        "Resolve incident tanpa JWT harus 401",
        async () => {

            const response = await request(app)
                .patch("/api/incidents/1/resolve");

            expect(response.statusCode).toBe(401);

        }
    );

});