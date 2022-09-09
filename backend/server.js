//main server code


//import dependencies
import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

// express server object
const app = express();

// apply middleware - cors module
app.use(cors())

app.use(express.json())

//the url people go to
app.use("/api/v1/restaurants", restaurants)
//* catches if people go outside the allowed directory
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

//exports app as a module
export default app