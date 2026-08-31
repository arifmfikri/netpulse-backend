const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

const {
    validateRegister,
    validateLogin
} = require("../validators/authValidator");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user baru
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Arif
 *               email:
 *                 type: string
 *                 format: email
 *                 example: arif@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *       400:
 *         description: Data tidak valid
 *       409:
 *         description: Email sudah terdaftar
 */
router.post(
    "/register", 
    validateRegister,
    register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: arif@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login berhasil
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Email atau password salah
 */
router.post(
    "/login", 
    validateLogin,
    login
);

module.exports = router;