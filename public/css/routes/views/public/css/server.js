const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()

const app = express()

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// View engine & static folder
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/", require("./routes/index"))

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
