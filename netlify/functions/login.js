// YOUR_REPO_ROOT/netlify/functions/login.js
// This function will handle requests to simulate a login
exports.handler = async (event, context) => {
    // 1. Ensure the request is a POST request (standard for login forms)
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405, // Method Not Allowed
            body: 'Method Not Allowed',
            headers: {
                'Access-Control-Allow-Origin': '*', // CORS header
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        };
    }

    // Handle preflight OPTIONS requests for CORS (important for browsers)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200, // OK for preflight
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: '',
        };
    }

    try {
        // 2. Parse the request body (assuming JSON from your frontend fetch)
        const { agentId, agentPassword } = JSON.parse(event.body);

        // For debugging purposes, you can see these in Netlify's function logs
        console.log(`Login attempt: Agent ID - ${agentId}, Password - ${agentPassword}`);

        // 3. Simulate a network delay to make it feel realistic (e.g., 1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 4. Always return "Wrong credentials" for this demonstration
        // We use statusCode 401 (Unauthorized) which is standard for failed logins.
        return {
            statusCode: 401, // Unauthorized
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Essential for cross-origin requests
                'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow these methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow these headers
            },
            body: JSON.stringify({ success: false, message: 'Wrong credentials, contact the IT department.' }),
        };

    } catch (error) {
        // 5. Handle any unexpected errors during function execution
        console.error('Function error:', error);
        return {
            statusCode: 500, // Internal Server Error
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ success: false, message: 'An unexpected server error occurred.' }),
        };
    }
};
