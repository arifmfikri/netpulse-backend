const pool = require("../config/database");


// GET ALL DEVICES
const getDevices = async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT *
             FROM devices
             WHERE user_id = $1
             ORDER BY id`,
            [req.user.id]
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// GET DEVICE BY ID
const getDeviceById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT *
             FROM devices
             WHERE id = $1
             AND user_id = $2`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Device tidak ditemukan"
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// CREATE DEVICE
const createDevice = async (req, res) => {

    try {

        const {
            name,
            device_type,
            location,
            status
        } = req.body;

        if (!name || !device_type) {

            return res.status(400).json({
                success: false,
                message: "Name dan device_type wajib diisi"
            });
        }

        const result = await pool.query(
            `INSERT INTO devices
            (user_id, name, device_type, location, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                req.user.id,
                name,
                device_type,
                location || null,
                status || "offline"
            ]
        );

        res.status(201).json({
            success: true,
            message: "Device berhasil dibuat",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// UPDATE DEVICE
const updateDevice = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            device_type,
            location,
            status
        } = req.body;

        const result = await pool.query(
            `UPDATE devices
             SET name = $1,
                 device_type = $2,
                 location = $3,
                 status = $4
             WHERE id = $5
             AND user_id = $6
             RETURNING *`,
            [
                name,
                device_type,
                location,
                status,
                id,
                req.user.id
            ]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Device tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Device berhasil diperbarui",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// DELETE DEVICE
const deleteDevice = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM devices
             WHERE id = $1
             AND user_id = $2
             RETURNING *`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Device tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Device berhasil dihapus"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


module.exports = {
    getDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
};