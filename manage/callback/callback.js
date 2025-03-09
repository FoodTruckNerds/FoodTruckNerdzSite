const { API_URL } = require('../../config');

async function handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const statusElement = document.getElementById('status');

    if (!code) {
        statusElement.textContent = 'Error: No authorization code received';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/google/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for receiving cookies
            body: JSON.stringify({ code })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Authentication failed: ${response.status}`);
        }

        statusElement.textContent = 'Successfully authenticated!';
        
        // Redirect back to manage page after 2 seconds
        setTimeout(() => {
            window.location.href = '/manage/';
        }, 2000);
    } catch (error) {
        console.error('Authentication error:', error);
        statusElement.textContent = 'Authentication failed: ' + error.message;
    }
}

// Start the OAuth callback handling when the page loads
handleCallback();
