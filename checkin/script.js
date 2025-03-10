let currentLocation = null;

document.getElementById('locationBtn').addEventListener('click', () => {
    if (!navigator.geolocation) {
        showMessage('Geolocation is not supported by your browser', 'error');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            document.getElementById('coordinates').textContent = 
                `📍 ${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`;
        },
        (error) => {
            showMessage('Unable to retrieve your location', 'error');
        }
    );
});

document.getElementById('checkinForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!currentLocation) {
        showMessage('Please get your current location first', 'error');
        return;
    }

    const data = {
        truckId: document.getElementById('truckId').value,
        status: 'open',
        location: currentLocation
    };

    try {
        const response = await fetch('https://food-truck-api-main-4443f2d.d2.zuplo.dev/api/checkin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            showMessage(result.message, 'success');
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Check-in failed');
        }
    } catch (error) {
        showMessage(error.message || 'Failed to check in. Please try again.', 'error');
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = type;
}
