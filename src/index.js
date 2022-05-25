import express from "express";
import dotenv from "dotenv";
import './db/mongoose.js'
// import { MongoClient } from "mongodb";
import cors from "cors";
import router from './routers/router.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

app.get("/", function (request, response) {
  response.send("Welcome to Hotel");
});
