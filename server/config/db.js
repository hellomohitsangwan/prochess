import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://mohit:mohit1234@plotline-bill.ev6e1oe.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

