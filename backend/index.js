//connects to database and starts server

//import what was created
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000
//connects to database
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50, //num of people that can be connected at once
        wtimeoutMS: 2500 }
    )
//catches errors
    .catch(err => {
        console.error(err.stack)
        process.exit(1);
    })

    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })