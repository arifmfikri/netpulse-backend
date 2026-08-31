const pool = require("../config/database");


// GET ALL INCIDENTS
const getIncidents = async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT *
             FROM incidents
             WHERE user_id = $1
             ORDER BY detected_at DESC`,
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


// GET INCIDENT BY ID
const getIncidentById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT *
             FROM incidents
             WHERE id = $1
             AND user_id = $2`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Incident tidak ditemukan"
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


// ACKNOWLEDGE INCIDENT
const acknowledgeIncident = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `UPDATE incidents
             SET status = 'acknowledged'
             WHERE id = $1
             AND user_id = $2
             AND status = 'open'
             RETURNING *`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Incident tidak ditemukan atau sudah diproses"
            });
        }

        res.json({
            success: true,
            message: "Incident berhasil di-acknowledge",
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


// RESOLVE INCIDENT
const resolveIncident = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `UPDATE incidents
             SET status = 'resolved',
                 resolved_at = NOW()
             WHERE id = $1
             AND user_id = $2
             AND status IN ('open', 'acknowledged')
             RETURNING *`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Incident tidak ditemukan atau sudah resolved"
            });
        }

        res.json({
            success: true,
            message: "Incident berhasil di-resolve",
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


module.exports = {
    getIncidents,
    getIncidentById,
    acknowledgeIncident,
    resolveIncident
};