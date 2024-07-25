const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://krishna_deheriya:Krishna18@cluster01.3sprkid.mongodb.net/foodWayDB?retryWrites=true&w=majority&appName=Cluster01';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        const foodItems = mongoose.connection.db.collection("FoodItems");
        const data = await foodItems.find({}).toArray();

        if (data) console.log("Food-items data fetched successfully");
        else console.log("Error in fetching the data");

        // const foodItems = mongoose.connection.db.collection("FoodItems");
        // foodItems.find({}).toArray((err, data) => {
        //     if (err) {
        //         console.error("Error fetching data:", err);
        //     } else {
        //         console.log("Data fetched successfully:", data);
        //     }
        // });
    
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;