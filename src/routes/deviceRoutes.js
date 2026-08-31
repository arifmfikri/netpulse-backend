const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");

const validateId =
    require("../validators/idValidator");

const {
    validateCreateDevice,
    validateUpdateDevice
} = require("../validators/deviceValidator");

const {
    getDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
} = require("../controllers/deviceController");

const router = express.Router();

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Mendapatkan semua device milik user
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar device
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/",
    authenticateToken,
    getDevices
);

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Mendapatkan device berdasarkan ID
 *     tags: [Devices]
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
 *         description: Device ditemukan
 *       400:
 *         description: ID tidak valid
 *       404:
 *         description: Device tidak ditemukan
 */
router.get(
    "/:id",
    authenticateToken,
    validateId,
    getDeviceById
);

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Membuat device baru
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - device_type
 *             properties:
 *               name:
 *                 type: string
 *                 example: Temperature Sensor 01
 *               device_type:
 *                 type: string
 *                 example: temperature_sensor
 *               location:
 *                 type: string
 *                 example: Server Room
 *               status:
 *                 type: string
 *                 enum:
 *                   - online
 *                   - offline
 *                 example: online
 *     responses:
 *       201:
 *         description: Device berhasil dibuat
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/",
    authenticateToken,
    validateCreateDevice,
    createDevice
);

/**
 * @swagger
 * /api/devices/{id}:
 *   put:
 *     summary: Mengupdate device
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - device_type
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: Temperature Sensor 01
 *               device_type:
 *                 type: string
 *                 example: temperature_sensor
 *               location:
 *                 type: string
 *                 example: Server Room
 *               status:
 *                 type: string
 *                 enum:
 *                   - online
 *                   - offline
 *                 example: online
 *     responses:
 *       200:
 *         description: Device berhasil diupdate
 *       400:
 *         description: Data tidak valid
 *       404:
 *         description: Device tidak ditemukan
 */
router.put(
    "/:id",
    authenticateToken,
    validateId,
    validateUpdateDevice,
    updateDevice
);

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: Menghapus device
 *     tags: [Devices]
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
 *         description: Device berhasil dihapus
 *       404:
 *         description: Device tidak ditemukan
 */
router.delete(
    "/:id",
    authenticateToken,
    validateId,
    deleteDevice
);

module.exports = router;