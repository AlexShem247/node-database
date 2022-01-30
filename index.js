// npm init - initilse package.json so you can download third-party modules
const express = require("express") // Import module
const Datastore = require("nedb") // Import database module

const app = express()
const port = process.env.PORT || 3000 // Return port number for online server service or uses 3000

app.listen(port, () => console.log(`Listening at ${port}`)) // Port number and call back function
app.use(express.static("public")) // Make public folder public - run when connection is made 
app.use(express.json({limit: "1mb"}))

const database = new Datastore("database.db") // Create database
database.loadDatabase() // Load database

app.get("/api", (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end() // End response
        }
        response.json(data)
    })
})

app.post("/api", (request, response) => {
    // console.log(request.body) // body contains the sent data
    const data = request.body
    const timestamp = Date.now()
    data.timestamp = timestamp

    database.insert(data)
    response.json(data) // Send data
})

/*
Jobs of the server
1) Serve web pages, i.e. index.html
To connect to server, go to localhost:3000 on a web browser
2) Add data to local database
3) Send data back to client
*/