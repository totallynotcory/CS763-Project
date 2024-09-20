//This file is for defining the schema and retrieving data
//May turn this into two files moving forward (schema for one file, connection for another)

const mongoose = require('mongoose')
const credentials = require('./credentials.js')

let connection = null
let userModel = null
let models = null

let Schema = mongoose.Schema

mongoose.Promise = global.Promise;

let userSchema = new Schema({
	userId: { type: String, required: true },
	email: { type: String, required: true },
	password_hashed: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
	goals: {type: [String], required: false } //type: [goalSchema] once that is created
}, {
    collection: 'users'
})

module.exports = {
    getModel: () => {
		if (connection == null) {
			connection = mongoose.createConnection(credentials.MONGO_URI)
			console.log("Connected to MongoDB!")
			userModel = connection.model("User", userSchema);
			models = {userModel: userModel}
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