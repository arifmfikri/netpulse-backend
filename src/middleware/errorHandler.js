// ========================================
// 404 HANDLER
// ========================================
const notFound = (req, res) => {

    res.status(404).json({
        success: false,
        message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`
    });

};


// ========================================
// GLOBAL ERROR HANDLER
// ========================================
const errorHandler = (err, req, res, next) => {

    console.error("ERROR:", err);


    // JSON invalid
    if (
        err instanceof SyntaxError &&
        err.status === 400 &&
        "body" in err
    ) {
        return res.status(400).json({
            success: false,
            message: "Format JSON tidak valid"
        });
    }


    // Default error
    res.status(err.status || 500).json({
        success: false,
        message:
            err.message || "Internal server error"
    });

};


module.exports = {
    notFound,
    errorHandler
};