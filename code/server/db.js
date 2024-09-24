//This file is for defining the schema and retrieving data
//May turn this into two files moving forward (schema for one file, connection for another)

const mongoose = require('mongoose')
const dotenv = require('dotenv');
//const credentials = require('./credentials.js')

// Load the appropriate .env file based on NODE_ENV
//NODE_ENV is set via package.json like this:

//"scripts": {
//  "start": "cross-env NODE_ENV=production node server",
//  "dev": "cross-env NODE_ENV=development nodemon server"
//}

//cross-env is a small utility that helps set environment variables in a cross-platform way, ensuring compatibility between different operating systems (such as Windows, macOS, and Linux).
const result = dotenv.config({
	path: `.env.${process.env.NODE_ENV}` // This evaluates to either .env.production or .env.development.
  });
  

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

module.exports = {
    getModel: () => {
		if (connection == null) {
			connection = mongoose.createConnection(process.env.MONGO_URI)
			console.log("Connected to MongoDB!")
			userModel = connection.model("User", userSchema);
			goalModel = connection.model("Goal", goalSchema);
			models = {userModel: userModel, goalModel: goalModel}
		}
		return models
	},
	closeConnection: () => {
		if (connection != null) {
			connection.close()
			console.log("MongoDB connection is closed")
		}
	}
}