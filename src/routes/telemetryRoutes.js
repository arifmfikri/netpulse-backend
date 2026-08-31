const express = require("express");

const authenticateToken =
    require("../middleware/authMiddleware");

const validateId =
    require("../validators/idValidator");

const {
    validateCreateTelemetry
} = require("../validators/telemetryValidator");

const {
    createTelemetry,
    getDeviceTelemetry
} = require("../controllers/telemetryController");

const router = express.Router();


/**
 * @swagger
 * /api/telemetry:
 *   post:
 *     summary: Menambahkan data telemetry
 *     tags: [Telemetry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - device_id
 *               - metric_type
 *               - value
 *             properties:
 *               device_id:
 *                 type: integer
 *                 example: 1
 *               metric_type:
 *                 type: string
 *                 example: temperature
 *               value:
 *                 type: number
 *                 example: 28.5
 *               unit:
 *                 type: string
 *                 example: C
 *     responses:
 *       201:
 *         description: Telemetry berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/",
    authenticateToken,
    validateCreateTelemetry,
    createTelemetry
);


/**
 * @swagger
 * /api/telemetry/devices/{id}/telemetry:
 *   get:
 *     summary: Mendapatkan telemetry berdasarkan device
 *     tags: [Telemetry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Data telemetry
 *       400:
 *         description: ID tidak valid
 *       404:
 *         description: Device tidak ditemukan
 */
router.get(
    "/devices/:id/telemetry",
    authenticateToken,
    validateId,
    getDeviceTelemetry
);


module.exports = router;