import mongoose from 'mongoose';

const Connection = async (MONGODB_URL) => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;