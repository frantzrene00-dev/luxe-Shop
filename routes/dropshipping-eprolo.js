const express = require("express")
const router = express.Router()
const axios = require("axios")
const Product = require("../models/Product")

const EPROLO_API_KEY = process.env.EPROLO_API_KEY // mete nan .env
const EPROLO_USER_ID = process.env.EPROLO_USER_ID // mete nan .env

// Endpoint pou enpòte pwodwi Eprolo
router.get("/import-eprolo-products", async (req, res) => {
  try {
    const response = await axios.get("https://api.eprolo.com/v1/product/list", {
      params: {
        userId: EPROLO_USER_ID,
        apiKey: EPROLO_API_KEY,
        pageSize: 50 // kantite pwodwi pou rale
      }
    })

    const eproloProducts = response.data.products

    for (let item of eproloProducts) {
      await Product.updateOne(
        { name: item.name },
        { 
          name: item.name,
          price: item.price,
          description: item.description || "",
          image: item.image || ""
        },
        { upsert: true }
      )
    }

    res.send("Eprolo Products imported successfully!")
  } catch (err) {
    console.log(err)
    res.send("Error importing Eprolo products")
  }
})

module.exports = router
