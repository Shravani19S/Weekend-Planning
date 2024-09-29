// Main script for general functionality across the site

// Example function for the search bar in the home page (index.html)
function searchNearby() {
    const query = document.getElementById('search-bar').value.trim();
    
    if (query) {
        // Placeholder logic for searching nearby locations
        alert('Searching for nearby places: ' + query);
        
        // You can add an API call or redirect to a results page here
        // Example API call (commented out):
        // fetch(`/api/searchNearby?query=${query}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     // Handle the data (e.g., show results)
        //   })
        //   .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a search term.');
    }
}

// Common event listeners for different buttons or actions across the site
document.addEventListener('DOMContentLoaded', () => {
    console.log("Main script loaded and ready.");
});
