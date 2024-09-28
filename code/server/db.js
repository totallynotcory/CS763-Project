//This file is for defining the schema and retrieving data
//May turn this into two files moving forward (schema for one file, connection for another)

const mongoose = require('mongoose')
const dotenv = require('dotenv');

// Determine the correct .env file based on the environment
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// Load the appropriate .env file
dotenv.config({ path: `../${envFile}` }); 


let connection = null
let userModel = null
let models = null


let Schema = mongoose.Schema

mongoose.Promise = global.Promise;

let progressSchema = new Schema({
    date: { type: Date, required: true },
    value: { type: Number, required: true }  
});

let goalSchema = new Schema({
	goalId: { type: Number, required: true },
	type: { type: String, required: true },
	targetValue: { type: Number, required: true },
    unit: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
	progress: {type: [progressSchema], default: [] } 
}, {
    collection: 'goals'
})

let userSchema = new Schema({
	userId: { type: Number, required: true },
	email: { type: String, required: true },
	passwordHashed: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
	goals: {type: [goalSchema], default: [] } 
}, {
    collection: 'users'
})

const getModel = async () => {
	if (!connection) {
	  try {
		// Use mongoose.connect to establish the connection
		await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('Connected to MongoDB!');
  
		// Set the connection and initialize models
		connection = mongoose.connection;
		userModel = connection.model('User', userSchema);
		goalModel = connection.model('Goal', goalSchema);
	  } catch (err) {
		console.error('Failed to connect to MongoDB:', err.message);
		process.exit(1);  // Exit the process on failure
	  }
	}
  
	// Return the models once connected
	return { userModel, goalModel };
  };
  
  const closeConnection = async () => {
	if (connection) {
	  try {
		await connection.close();
		console.log('MongoDB connection is closed');
		connection = null;
	  } catch (err) {
		console.error('Error closing MongoDB connection:', err.message);
	  }
	}
  };
  
  // Export the functions
  module.exports = {
	getModel,
	closeConnection
  };

// module.exports = {
//     getModel: () => {
// 		if (connection == null) {
// 			connection = mongoose.createConnection(process.env.MONGO_URI)
// 			console.log("Connected to MongoDB!")
// 			userModel = connection.model("User", userSchema);
// 			goalModel = connection.model("Goal", goalSchema);
// 			models = {userModel: userModel, goalModel: goalModel}
// 		}
// 		return models
// 	},
// 	closeConnection: () => {
// 		if (connection != null) {
// 			connection.close()
// 			console.log("MongoDB connection is closed")
// 		}
// 	}
// }