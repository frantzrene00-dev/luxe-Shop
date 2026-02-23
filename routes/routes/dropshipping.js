const express = require("express")
const router = express.Router()
const axios = require("axios")
const Product = require("../models/Product")

const CJ_API_KEY = process.env.CJ_API_KEY // mete nan .env

// Endpoint pou rale pwodwi CJ
router.get("/import-cj-products", async (req, res) => {
  try {
    const response = await axios.get("https://api.cjdropshipping.com/api2.0/product/list", {
      headers: { "Authorization": `Bearer ${CJ_API_KEY}` }
    })

    const cjProducts = response.data.products

    for (let item of cjProducts) {
      await Product.updateOne(
        { name: item.name },
        { 
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image
        },
        { upsert: true }
      )
    }

    res.send("CJ Products imported successfully!")
  } catch (err) {
    console.log(err)
    res.send("Error importing products")
  }
})

module.exports = router
