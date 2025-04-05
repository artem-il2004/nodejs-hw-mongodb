export const errorHandler = (error, req, res, next) => {
    const { status = 500, message = "500 error" } = error;
    res.status(status).json({
        message,
    });
};