const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const authRoutes =
    require("./routes/authRoutes");

const deviceRoutes =
    require("./routes/deviceRoutes");

const telemetryRoutes =
    require("./routes/telemetryRoutes");

const incidentRoutes =
    require("./routes/incidentRoutes");

const {
    notFound,
    errorHandler
} = require("./middleware/errorHandler");


const app = express();

// GLOBAL MIDDLEWARE
app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// ROOT
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "NetPulse API is running"
    });

});

// API ROUTES
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/devices",
    deviceRoutes
);

app.use(
    "/api/telemetry",
    telemetryRoutes
);

app.use(
    "/api/incidents",
    incidentRoutes
);

// 404
app.use(notFound);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

module.exports = app;