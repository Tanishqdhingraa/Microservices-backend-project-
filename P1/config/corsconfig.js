const cors = require('cors')  // Import the CORS middleware

// Function to configure CORS settings
const configcors = () => {
    return cors({
        // Define which origins (domains) are allowed to access the backend
        origin: (origin, callbacks) => {
            const allowedones = [
                'http://localhost:3001',    // local frontend
                'https:/randomdomain.com'   // production domain
            ]

            // Allow request if origin is in allowed list or has no origin (like Postman)
            if (!origin || allowedones.indexOf(origin) !== -1) {
                callbacks(null, true)  // ✅ Allow
            } else {
                callbacks(new Error("Not allowed by CORS"))  // ❌ Block
            }
        },

        // Allow only specific HTTP methods
        methods: ['GET', 'POST', 'DELETE', 'PUT'],

        // Define headers the client can send in requests
        allowedHeaders: [
            'Content-Type',
            'Authorization',     // (Fixed typo from "Authorizsation")
            'Accept-Version'     // (Fixed typo from "Aceept-Version")
        ],

        // Define headers that can be exposed to the client
        exposedHeaders: ['X-Total-Count', 'Content-Range'], // (Fixed "Counter-Range")

        credentials: true,   // Allow cookies and credentials
        preflightContinue: false,  // Don’t pass preflight (OPTIONS) request to next handler
        maxAge: 600,        // Cache preflight response for 600 seconds (10 minutes)
        optionsSuccessStatus: 204 , //SUCCESFULL DONE REQUEST 
    })
}

module.exports={configcors}
