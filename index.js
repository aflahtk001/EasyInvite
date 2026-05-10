
import express from "express"
import bodyParser from "body-parser"
import { dbConnect } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

let app = express()
let port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

async function getCollection(name) {
  const db = await dbConnect();
  return db.collection(name)
}


app.get("/", (req, res) => {
  res.render("index.ejs", {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
  })
})
app.get("/invite/:key", async (req, res) => {
  let key = req.params.key
  let collection = await getCollection("userData")
  let data = await collection.find({ key: key }).toArray()

  let detedata = data[0].date
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [year, month, day] = detedata.split('-');

  const result = {
    year: Number(year),
    month: months[Number(month) - 1],
    day: Number(day)
  };

  console.log(result);
  res.render("invite.ejs", { data: data[0], date: result })

})
app.post("/submit", async (req, res) => {
  const imageUrls = JSON.parse(req.body.imageUrls);
  let key = Math.random().toString().slice(2, 9)
  let data = {
    key: key,
    groom: req.body.groom,
    bride: req.body.bride,
    date: req.body.date,
    venue: req.body.venue,
    location: req.body.location,
    mapsLink: req.body.mapsLink,
    story: req.body.story,
    images: imageUrls
  }

  let collection = await getCollection("userData")
  const result = await collection.insertOne(data);
  console.log(data)
  res.render("shareLink.ejs", { key: key })
})

app.listen(port, () => {
  console.log(`server is running at port ${port}`)

})