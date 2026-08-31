const request = require("supertest");

const app = require("../src/app");


describe("NetPulse API", () => {

    test("GET / harus mengembalikan API running", async () => {

        const response = await request(app)
            .get("/");

        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            success: true,
            message: "NetPulse API is running"
        });

    });


    test("GET endpoint yang tidak tersedia harus 404", async () => {

        const response = await request(app)
            .get("/api/endpoint-tidak-ada");

        expect(response.statusCode).toBe(404);

        expect(response.body.success).toBe(false);

    });

});