// npm init - initilse package.json so you can download third-party modules
const express = require("express") // Import module
const sqlite3 = require('sqlite3').verbose()

const app = express()
const port = process.env.PORT || 3000 // Return port number for online server service or uses 3000

app.listen(port, () => console.log(`Listening at ${port}`)) // Port number and call back function
app.use(express.static("public")) // Make public folder public - run when connection is made 
app.use(express.json({limit: "1mb"}))

const db = new sqlite3.Database("database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to Database");
  })

app.get("/api", (request, response) => {

    db.all("SELECT * FROM data", [], (err, rows) => {
        if (err) {
          throw err;
        }
        response.json(rows)
      });
})

app.post("/api", (request, response) => {
    // console.log(request.body) // body contains the sent data
    const data = request.body
    const timestamp = Date.now()
    data.timestamp = timestamp

    const sql = `INSERT INTO data VALUES (${data.lat}, ${data.lon}, '${data.name}', ${data.timestamp})`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
    });
    response.json({"query": sql}) // Send data
})

/*
Jobs of the server
1) Serve web pages, i.e. index.html
To connect to server, go to localhost:3000 on a web browser
2) Add data to local database
3) Send data back to client
*/