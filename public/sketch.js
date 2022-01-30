function getData() {
    if ("geolocation" in navigator) { // Navigator is an object containing information about the connecting client
        navigator.geolocation.getCurrentPosition(async function(position) { // Gets current GPS location
            let lat = position.coords.latitude
            let lon = position.coords.longitude
            let name = document.getElementById("name").value
            
            document.getElementById("lat").textContent = lat
            document.getElementById("lon").textContent = lon

            if (loaded) {
                // Send data via POST protocol
                const data = {lat, lon, name};
                const options = {
                    method: "POST", // Type of protocol
                    headers: {
                        "Content-Type": "application/json" // Specifiy that we are sending a JSON
                    },
                    body: JSON.stringify(data), // The data we are sending
                }

                const response = await fetch("/api", options) // Apply fetch to the 'api' fetch using the data in options
                const json = await response.json()
                console.log(json)
            }
            loaded = true
            
        })
    } else {
        console.log("Geolocation not available")
    }

}

let loaded = false
getData()