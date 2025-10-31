// Middleware to log each incoming request
const requestlogger = (req, res, next) => {
    const timeStamp = new Date().toISOString();  // Get current time in ISO format
    const method = req.method;                   // HTTP method (GET, POST, etc.)
    const url = req.url;                         // Requested URL path
    const userAgent = req.get("User-Agent");     // Info about the client/browser

    // Print request details to the console
    console.log(`${timeStamp} ${method} ${url} ${userAgent}`);
    next();  // Pass control to the next middleware or route handler
}

// Middleware to add a timestamp to every request object
const Addtimestamp = (req, res, next) => {
    req.timeStamp = new Date().toISOString();  // Add time property to request
    next();  // Move to the next middleware or route
}

// Export both middlewares so they can be used in other files
module.exports = { requestlogger, Addtimestamp };
