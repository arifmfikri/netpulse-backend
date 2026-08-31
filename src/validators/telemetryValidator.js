const validateCreateTelemetry = (req, res, next) => {

    const {
        device_id,
        metric_type,
        value,
        unit
    } = req.body;


    // Field wajib
    if (
        device_id === undefined ||
        !metric_type ||
        value === undefined
    ) {
        return res.status(400).json({
            success: false,
            message:
                "device_id, metric_type, dan value wajib diisi"
        });
    }


    // device_id harus angka
    if (
        !Number.isInteger(Number(device_id)) ||
        Number(device_id) <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: "device_id harus berupa angka positif"
        });
    }


    // metric_type
    if (
        typeof metric_type !== "string" ||
        metric_type.trim().length < 2
    ) {
        return res.status(400).json({
            success: false,
            message: "metric_type tidak valid"
        });
    }


    // value harus angka
    if (
        typeof value !== "number" ||
        !Number.isFinite(value)
    ) {
        return res.status(400).json({
            success: false,
            message: "value harus berupa angka"
        });
    }


    // unit jika ada
    if (
        unit !== undefined &&
        unit !== null &&
        typeof unit !== "string"
    ) {
        return res.status(400).json({
            success: false,
            message: "unit harus berupa teks"
        });
    }


    next();
};


module.exports = {
    validateCreateTelemetry
};