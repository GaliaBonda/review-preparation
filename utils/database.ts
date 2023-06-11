import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('Database is already connected')
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI ?? '', {
            dbName: 'review_prep',
        })
    } catch (error) {
        console.log(error)
    }
}