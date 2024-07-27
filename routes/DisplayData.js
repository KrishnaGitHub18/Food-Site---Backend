const express = require('express');
const router = express.Router();

router.post(
    '/foodItemsData',
    (req, res) => {
        try {
            //console.log(foodCategory); //foodItems is a global variable
            res.send([foodItems, foodCategory]);
        } catch (error) {
            console.error(error.message);
            res.send("Server Error -", "Error in Backend/routes/DisplayData");
        }
    }
)

module.exports = router;