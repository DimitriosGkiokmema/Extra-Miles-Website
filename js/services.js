let services = {};

// Load CSV file
d3.csv("data/services.csv", row => {
    services[row.service] = row.description;

    return row;
}).then( data => {
    displayServices();
});

function displayServices() {
    // Iterate over services
    for (var key in services) {
        // Create service boxes
        createService(key);
      }
}

function createService(key) {
    // Create html elements
    const container = document.createElement("div");
    container.className = 'serviceContainer';
    const service = document.createElement("h1");
    service.className = 'serviceTitle';
    const description = document.createElement("h2");
    description.className = 'serviceDescription';

    // Add text
    service.innerText = key;
    description.innerText = services[key];
    container.appendChild(service);
    container.appendChild(description);

    // Get parent
    const parent = document.getElementById('services');
    parent.appendChild(container);
}