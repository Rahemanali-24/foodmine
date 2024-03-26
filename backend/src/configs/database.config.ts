import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();



const dbConnect = () => {
    mongoose.connect("mongodb+srv://foodmine:hUFCWd2Bh68kVmf8@cluster0.7fqf1aq.mongodb.net/", {

    })
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB:", error);
    });
};

export default dbConnect;
