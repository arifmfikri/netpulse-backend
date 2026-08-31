const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "NetPulse API",
            version: "1.0.0",
            description:
                "REST API untuk monitoring IoT devices, telemetry, dan incidents"
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Development Server"
            }
        ],

        tags: [
            {
                name: "Authentication",
                description: "Authentication dan user access"
            },
            {
                name: "Devices",
                description: "Manajemen perangkat IoT"
            },
            {
                name: "Telemetry",
                description: "Data telemetry perangkat"
            },
            {
                name: "Incidents",
                description: "Manajemen incident"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: [
        "./src/routes/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;