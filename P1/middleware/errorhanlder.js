// Custom error class for API errors
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "APIError";
    }
}

// Async handler to catch errors in async routes
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next); // Forward error to global handler
};

// Global error handling middleware
const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack

    // Handle custom API errors
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            status: "Error",
            message: err.message,
        });
    }

    // Handle Mongoose validation errors
    else if (err.name === "ValidationError") {
        return res.status(400).json({
            status: "Error",
            message: "Validation error",
        });
    }

    // Handle all other errors
    return res.status(500).json({
        status: "Error",
        message: "An unexpected error occurred",
    });
};

// Export all modules
module.exports = {
    APIError,
    asyncHandler,
    globalErrorHandler,
};
 