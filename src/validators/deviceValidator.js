// ========================================
// CREATE DEVICE
// ========================================
const validateCreateDevice = (req, res, next) => {

    const {
        name,
        device_type,
        location,
        status
    } = req.body;


    // Field wajib
    if (!name || !device_type) {
        return res.status(400).json({
            success: false,
            message: "Name dan device_type wajib diisi"
        });
    }


    // Name
    if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Name device minimal 2 karakter"
        });
    }


    // Device type
    if (
        typeof device_type !== "string" ||
        device_type.trim().length < 2
    ) {
        return res.status(400).json({
            success: false,
            message: "device_type tidak valid"
        });
    }


    // Status
    if (
        status !== undefined &&
        !["online", "offline"].includes(status)
    ) {
        return res.status(400).json({
            success: false,
            message: "Status harus online atau offline"
        });
    }


    next();
};


// ========================================
// UPDATE DEVICE
// ========================================
const validateUpdateDevice = (req, res, next) => {

    const {
        name,
        device_type,
        location,
        status
    } = req.body;


    if (!name || !device_type || !status) {
        return res.status(400).json({
            success: false,
            message: "Name, device_type, dan status wajib diisi"
        });
    }


    if (
        typeof name !== "string" ||
        name.trim().length < 2
    ) {
        return res.status(400).json({
            success: false,
            message: "Name device minimal 2 karakter"
        });
    }


    if (
        !["online", "offline"].includes(status)
    ) {
        return res.status(400).json({
            success: false,
            message: "Status harus online atau offline"
        });
    }


    next();
};


module.exports = {
    validateCreateDevice,
    validateUpdateDevice
};