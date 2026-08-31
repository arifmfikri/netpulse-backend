const request = require("supertest");

const app = require("../src/app");


describe("Device API Authentication & Validation", () => {

    // =====================================================
    // 1. GET /api/devices tanpa JWT
    // =====================================================
    test(
        "GET /api/devices tanpa JWT harus 401",
        async () => {

            const response =
                await request(app)
                    .get("/api/devices");


            expect(response.statusCode).toBe(401);

            expect(response.body.success).toBe(false);

        }
    );


    // =====================================================
    // 2. POST /api/devices tanpa JWT
    // =====================================================
    test(
        "POST /api/devices tanpa JWT harus 401",
        async () => {

            const response =
                await request(app)
                    .post("/api/devices")
                    .send({
                        name: "Temperature Sensor",
                        device_type: "temperature_sensor",
                        location: "Server Room",
                        status: "online"
                    });


            expect(response.statusCode).toBe(401);

        }
    );


    // =====================================================
    // 3. User dengan JWT dapat mengakses devices
    // =====================================================
    test(
        "User yang memiliki JWT dapat mengakses devices",
        async () => {

            // -------------------------------------------------
            // EMAIL UNIK
            // -------------------------------------------------
            const email =
                `device_${Date.now()}@example.com`;


            // -------------------------------------------------
            // REGISTER
            // -------------------------------------------------
            const registerResponse =
                await request(app)
                    .post("/api/auth/register")
                    .send({
                        name: "Device Test",
                        email: email,
                        password: "123456"
                    });


            expect(registerResponse.statusCode).toBe(201);


            // -------------------------------------------------
            // LOGIN
            // -------------------------------------------------
            const loginResponse =
                await request(app)
                    .post("/api/auth/login")
                    .send({
                        email: email,
                        password: "123456"
                    });


            expect(loginResponse.statusCode).toBe(200);


            // -------------------------------------------------
            // AMBIL JWT
            // -------------------------------------------------
            const token =
                loginResponse.body.data.token;


            expect(token).toBeDefined();


            // -------------------------------------------------
            // ACCESS DEVICES
            // -------------------------------------------------
            const deviceResponse =
                await request(app)
                    .get("/api/devices")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );


            expect(deviceResponse.statusCode).toBe(200);

            expect(deviceResponse.body.success).toBe(true);

        }
    );


    // =====================================================
    // 4. ID bukan angka tanpa JWT
    // =====================================================
    test(
        "GET device dengan ID bukan angka tanpa JWT harus 401",
        async () => {

            const response =
                await request(app)
                    .get("/api/devices/abc");


            /*
             * Authentication berjalan terlebih dahulu.
             *
             * Tidak ada JWT → 401.
             */

            expect(response.statusCode).toBe(401);

        }
    );


    // =====================================================
    // 5. ID bukan angka dengan JWT
    // =====================================================
    test(
        "GET device dengan ID bukan angka menggunakan JWT harus 400",
        async () => {

            // -------------------------------------------------
            // EMAIL UNIK
            // -------------------------------------------------
            const email =
                `validation_${Date.now()}@example.com`;


            // -------------------------------------------------
            // REGISTER
            // -------------------------------------------------
            const registerResponse =
                await request(app)
                    .post("/api/auth/register")
                    .send({
                        name: "Validation Test",
                        email: email,
                        password: "123456"
                    });


            expect(registerResponse.statusCode).toBe(201);


            // -------------------------------------------------
            // LOGIN
            // -------------------------------------------------
            const loginResponse =
                await request(app)
                    .post("/api/auth/login")
                    .send({
                        email: email,
                        password: "123456"
                    });


            expect(loginResponse.statusCode).toBe(200);


            // -------------------------------------------------
            // AMBIL JWT
            // -------------------------------------------------
            const token =
                loginResponse.body.data.token;


            expect(token).toBeDefined();


            // -------------------------------------------------
            // ACCESS INVALID ID
            // -------------------------------------------------
            const response =
                await request(app)
                    .get("/api/devices/abc")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );


            /*
             * JWT valid
             *      ↓
             * Authentication berhasil
             *      ↓
             * ID validation dijalankan
             *      ↓
             * "abc" bukan angka
             *      ↓
             * 400 Bad Request
             */

            expect(response.statusCode).toBe(400);

        }
    );

});