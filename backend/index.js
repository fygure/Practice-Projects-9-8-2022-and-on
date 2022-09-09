//connects to database and starts server

//import what was created
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
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
        await RestaurantsDAO.injectDB(client) //how we get inital reference to restaurant's collection in database
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
