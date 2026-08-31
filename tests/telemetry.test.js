const request = require("supertest");

const app = require("../src/app");


describe("Telemetry API", () => {

    test(
        "POST telemetry tanpa JWT harus 401",
        async () => {

            const response = await request(app)
                .post("/api/telemetry")
                .send({
                    device_id: 1,
                    metric_type: "temperature",
                    value: 28.5,
                    unit: "C"
                });

            expect(response.statusCode).toBe(401);

        }
    );


    test(
        "GET telemetry tanpa JWT harus 401",
        async () => {

            const response = await request(app)
                .get("/api/telemetry/devices/1/telemetry");

            expect(response.statusCode).toBe(401);

        }
    );

});