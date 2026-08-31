const validateId = (req, res, next) => {

    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            success: false,
            message: "ID harus berupa angka"
        });
    }

    if (Number(id) <= 0) {
        return res.status(400).json({
            success: false,
            message: "ID harus lebih besar dari 0"
        });
    }

    next();
};


module.exports = validateId;