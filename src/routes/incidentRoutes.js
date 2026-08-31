const express = require("express");

const authenticateToken =
    require("../middleware/authMiddleware");

const validateId =
    require("../validators/idValidator");

const {
    getIncidents,
    getIncidentById,
    acknowledgeIncident,
    resolveIncident
} = require("../controllers/incidentController");

const router = express.Router();


/**
 * @swagger
 * /api/incidents:
 *   get:
 *     summary: Mendapatkan semua incident
 *     tags: [Incidents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar incident
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/",
    authenticateToken,
    getIncidents
);


/**
 * @swagger
 * /api/incidents/{id}:
 *   get:
 *     summary: Mendapatkan incident berdasarkan ID
 *     tags: [Incidents]
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
 *         description: Incident ditemukan
 *       400:
 *         description: ID tidak valid
 *       404:
 *         description: Incident tidak ditemukan
 */
router.get(
    "/:id",
    authenticateToken,
    validateId,
    getIncidentById
);


/**
 * @swagger
 * /api/incidents/{id}/acknowledge:
 *   patch:
 *     summary: Meng-acknowledge incident
 *     tags: [Incidents]
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
 *         description: Incident berhasil di-acknowledge
 *       404:
 *         description: Incident tidak ditemukan
 */
router.patch(
    "/:id/acknowledge",
    authenticateToken,
    validateId,
    acknowledgeIncident
);


/**
 * @swagger
 * /api/incidents/{id}/resolve:
 *   patch:
 *     summary: Menyelesaikan incident
 *     tags: [Incidents]
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
 *         description: Incident berhasil di-resolve
 *       404:
 *         description: Incident tidak ditemukan
 */
router.patch(
    "/:id/resolve",
    authenticateToken,
    validateId,
    resolveIncident
);


module.exports = router;