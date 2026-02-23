const express = require("express")
const router = express.Router()
const Product = require("../models/Product")

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.render("index", { products })
  } catch (error) {
    console.log(error)
    res.send("Error loading products")
  }
})

module.exports = router
