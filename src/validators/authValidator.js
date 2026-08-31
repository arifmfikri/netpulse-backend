// ========================================
// REGISTER VALIDATION
// ========================================
const validateRegister = (req, res, next) => {

    const { name, email, password } = req.body;

    // Cek field wajib
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email, dan password wajib diisi"
        });
    }

    // Validasi nama
    if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Name minimal 2 karakter"
        });
    }

    // Validasi email
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Format email tidak valid"
        });
    }

    // Validasi password
    if (typeof password !== "string" || password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password minimal 6 karakter"
        });
    }

    next();
};


// ========================================
// LOGIN VALIDATION
// ========================================
const validateLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email dan password wajib diisi"
        });
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Format email tidak valid"
        });
    }

    next();
};


module.exports = {
    validateRegister,
    validateLogin
};