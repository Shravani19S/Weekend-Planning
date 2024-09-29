document.addEventListener('DOMContentLoaded', () => {
    // For simplicity, this is a placeholder for nearby places fetching.
    // In real-world usage, you'd replace this with an API call (Google Places, Yelp, etc.)

    const nearbyPlacesDiv = document.getElementById('nearby-places');

    // Static list of nearby places for now
    const places = [
        { name: 'Central Park', description: 'A large public park in New York City.' },
        { name: 'Empire State Building', description: 'A famous skyscraper in New York City.' },
        { name: 'Statue of Liberty', description: 'Iconic symbol of freedom located in New York Harbor.' }
    ];

    nearbyPlacesDiv.innerHTML = places.map(place => `
        <div class="place-card">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        </div>
    `).join('');
});
