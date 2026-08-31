const pool = require("../config/database");


// POST TELEMETRY
const createTelemetry = async (req, res) => {

    try {

        const {
            device_id,
            metric_type,
            value,
            unit
        } = req.body;

        if (
            !device_id ||
            !metric_type ||
            value === undefined
        ) {

            return res.status(400).json({
                success: false,
                message: "device_id, metric_type, dan value wajib diisi"
            });
        }

        // Pastikan device milik user
        const device = await pool.query(
            `SELECT id
             FROM devices
             WHERE id = $1
             AND user_id = $2`,
            [device_id, req.user.id]
        );

        if (device.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Device tidak ditemukan"
            });
        }

        const result = await pool.query(
            `INSERT INTO telemetry
            (device_id, metric_type, value, unit)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                device_id,
                metric_type,
                value,
                unit || null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Telemetry berhasil disimpan",
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


// GET TELEMETRY DEVICE
const getDeviceTelemetry = async (req, res) => {

    try {

        const { id } = req.params;

        const device = await pool.query(
            `SELECT id
             FROM devices
             WHERE id = $1
             AND user_id = $2`,
            [id, req.user.id]
        );

        if (device.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Device tidak ditemukan"
            });
        }

        const result = await pool.query(
            `SELECT *
             FROM telemetry
             WHERE device_id = $1
             ORDER BY recorded_at DESC`,
            [id]
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


module.exports = {
    createTelemetry,
    getDeviceTelemetry
};