async function getData () {
    const response = await fetch("/api") // GET protocol
    const data = await response.json()
    
    for (item of data) {
        const root = document.createElement("div")
        const name = document.createElement("div")
        const geo = document.createElement("div")
        const date = document.createElement("div")

        name.textContent = `name: ${item.name}`
        geo.textContent = `${item.lat}°, ${item.lon}°`
        const dateString = new Date(item.timestamp).toLocaleString() // Convert number to date
        date.textContent = dateString

        root.append(name, geo, date, document.createElement("br"))
        document.body.append(root)
    }
}
getData()