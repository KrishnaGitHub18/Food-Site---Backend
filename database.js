const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://krishna_deheriya:Krishna18@cluster01.3sprkid.mongodb.net/foodWayDB?retryWrites=true&w=majority&appName=Cluster01';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");


        //Food Items Data
        const fetched_foodItems = mongoose.connection.db.collection("FoodItems");
        const foodItemsData = await fetched_foodItems.find({}).toArray();
        if (foodItemsData){
            global.foodItems = foodItemsData;
            console.log("Food-items data fetched successfully");
        }
        else console.log("Error in fetching the food items data");


        //Food Category Data
        const fetched_foodCategory = mongoose.connection.db.collection("FoodCategories");
        const foodCategoryData = await fetched_foodCategory.find({}).toArray();
        if (foodCategoryData){
            global.foodCategory = foodCategoryData;
            console.log("Food-category data fetched successfully");
        }
        else console.log("Error in fetching the food category data");

        
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;