// ✅ Middleware: Check version from the API URL path
const Apiversion = (version) => (req, res, next) => {
    // If full URL contains correct version (handles mounting issues)
    if (req.originalUrl.startsWith(`/api/${version}`)) {
        next(); // ✅ Allow request
    } else {
        res.status(404).json({
            success: false,
            error: `API version is not supported`
        });
    }
};

// ✅ Middleware: Check version from request header (Accept-version)
const headerversion = (version) => (req, res, next) => {
    const clientVersion = req.get('Accept-version'); // Header value
    if (clientVersion === version) {
        next(); // ✅ Allow
    } else {
        res.status(404).json({
            success: false,
            error: `API version is not supported`
        });
    }
};

// ✅ Middleware: Check version from response Content-Type header
const contentTypeverion = (version) => (req, res, next) => {
    const contentType = res.get('Content-Type'); // Get response header

    // Example: application/vnd.api.v1+json
    if (contentType && contentType.includes(`application/vnd.api.${version}+json`)) {
        next(); // ✅ Allow
    } else {
        res.status(404).json({
            success: false,
            error: `API version is not supported`
        });
    }
};

// ✅ Export all middlewares
module.exports = {
    headerversion,
    contentTypeverion,
    Apiversion
};
