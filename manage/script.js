async function checkSession() {
    try {
        const response = await fetch(`${window.API_URL}/business-info`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                // Not authenticated, show login button
                document.getElementById('loginSection').style.display = 'block';
                document.getElementById('businessSection').style.display = 'none';
            }
            throw new Error('Not authenticated');
        }

        const data = await response.json();
        showBusinessInfo(data);
    } catch (error) {
        console.error('Session check failed:', error);
    }
}

function showBusinessInfo(data) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('businessSection').style.display = 'block';
    
    const businessList = document.getElementById('businessList');
    businessList.innerHTML = '';
    
    if (data.accounts && data.accounts.length > 0) {
        data.accounts.forEach(account => {
            const accountDiv = document.createElement('div');
            accountDiv.className = 'business-item';
            accountDiv.innerHTML = `
                <h3>${account.accountName || 'Unnamed Account'}</h3>
                <p>Account ID: ${account.name}</p>
                <p>Type: ${account.type || 'Not specified'}</p>
                <p>State: ${account.state || 'Unknown'}</p>
            `;
            businessList.appendChild(accountDiv);
        });
    } else {
        businessList.innerHTML = '<p>No business accounts found. Please set up a Google Business Profile.</p>';
    }
}

function initiateGoogleLogin() {
    window.location.href = `${window.API_URL}/auth/login`;
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', initiateGoogleLogin);
    checkSession(); // Check if user is already authenticated
});
