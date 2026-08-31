const request = require("supertest");

const app = require("../src/app");


describe("Authentication API", () => {

    // =====================================================
    // 1. Register user baru
    // =====================================================
    test("Register user baru harus berhasil", async () => {

        const uniqueEmail =
            `test_${Date.now()}@example.com`;

        const response =
            await request(app)
                .post("/api/auth/register")
                .send({
                    name: "Test User",
                    email: uniqueEmail,
                    password: "123456"
                });

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

    });


    // =====================================================
    // 2. Register tanpa data
    // =====================================================
    test("Register tanpa data harus 400", async () => {

        const response =
            await request(app)
                .post("/api/auth/register")
                .send({});

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

    });


    // =====================================================
    // 3. Register dengan email tidak valid
    // =====================================================
    test(
        "Register dengan email tidak valid harus 400",
        async () => {

            const response =
                await request(app)
                    .post("/api/auth/register")
                    .send({
                        name: "Test User",
                        email: "email-salah",
                        password: "123456"
                    });

            expect(response.statusCode).toBe(400);

            expect(response.body.success).toBe(false);

        }
    );


    // =====================================================
    // 4. Login tanpa email
    // =====================================================
    test("Login tanpa email harus 400", async () => {

        const response =
            await request(app)
                .post("/api/auth/login")
                .send({
                    password: "123456"
                });

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

    });


    // =====================================================
    // 5. Register kemudian Login
    // =====================================================
    test(
        "Register kemudian login harus berhasil",
        async () => {

            // -------------------------------------------------
            // Generate email unik
            // -------------------------------------------------
            const uniqueEmail =
                `login_${Date.now()}@example.com`;


            // -------------------------------------------------
            // REGISTER
            // -------------------------------------------------
            const registerResponse =
                await request(app)
                    .post("/api/auth/register")
                    .send({
                        name: "Login Test",
                        email: uniqueEmail,
                        password: "123456"
                    });


            // Register harus berhasil
            expect(registerResponse.statusCode).toBe(201);


            // -------------------------------------------------
            // LOGIN
            // -------------------------------------------------
            const loginResponse =
                await request(app)
                    .post("/api/auth/login")
                    .send({
                        email: uniqueEmail,
                        password: "123456"
                    });


            // Login harus berhasil
            expect(loginResponse.statusCode).toBe(200);

            expect(loginResponse.body.success).toBe(true);


            // -------------------------------------------------
            // JWT berada di body.data.token
            // -------------------------------------------------
            const token =
                loginResponse.body.data.token;


            // Token harus tersedia
            expect(token).toBeDefined();

        }
    );

});