//This file is for defining the schema and retrieving data
//May turn this into two files moving forward (schema for one file, connection for another)

const mongoose = require('mongoose')
const dotenv = require('dotenv');
const path = require('path')

// Determine the correct .env file based on the environment
const envFile = process.env.NODE_ENV === 'production' ? '../.env.production' : '../.env.development';

// Load the appropriate .env file
// dotenv.config({ path: `../${envFile}` }); 
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) })

const connectDB = async () => {
	try {
	  const conn = await mongoose.connect(process.env.MONGO_URI);
	  console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
	  console.error(`Error: ${error.message}`);
	  process.exit(1);
	}
  };
  
  module.exports = connectDB;