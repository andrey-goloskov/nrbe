// import
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
// creating an app
const app = express()
const isProduction = process.env.NODE_ENV === "production"
// connecting to db
const mongoURL = isProduction
  ? "mongodb://mongo:27017/magnus"
  : "mongodb://localhost:27017/magnus"
mongoose
  .connect(`${mongoURL}`)
  .then(() => {
    console.log("Connected to mongodb.")
  })
  .catch((err) => {
    console.log("Что то пошло не так", err.message)
  })
// handling json
app.use(express.json())
// cors
const CLIENT_URL = isProduction ? "-" : "http://localhost:3000/"
app.use(
  cors({
    origin: `${CLIENT_URL}`,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
)
// analytics data schema
const anadataScheema = new mongoose.Schema(
  {
    innerHeight: { type: Number },
    innerWidth: { type: Number },
    outerHeight: { type: Number },
    outerWidth: { type: Number },
    screen: {
      availHeight: { type: Number },
      availWidth: { type: Number },
      availLeft: { type: Number },
      availTop: { type: Number },
      height: { type: Number },
      width: { type: Number },
      top: { type: Number },
      left: { type: Number },
      colorDepth: { type: Number },
      orientation: { type: String },
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
)
// analytics data model
const Anadata = mongoose.model("Data", anadataScheema)
// api
app.get("/datas/api", (req, res) => {
  res.status(200).json({ message: "GET request to the " })
})

app.post("/datas/", async (req, res, next) => {
  try {
    const anaData = new Anadata(req.body)
    await anaData.save()
    res.status(201).json({ PoStReQuEsT: req.headers.origin })
  } catch (err) {
    console.log(err.message)
  }
})
// listening server
const PORT = process.env.NODE_PORT || 32780
app.listen(`${PORT}`, () => {
  console.log(`application starting on ${PORT} port.`)
})
