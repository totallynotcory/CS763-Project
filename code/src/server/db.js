const mongoose = require('mongoose')
const credentials = require('./credentials.js')

let connection = null
let userModel = null
let models = null

let Schema = mongoose.Schema

mongoose.Promise = global.Promise;

let userSchema = new Schema({
    firstname: String,
    lastname: String
}, {
    collection: 'users'
})

module.exports = {
    getModel: () => {
		if (connection == null) {
			connection = mongoose.createConnection(credentials.MONGO_URI)
			userModel = connection.model("User", userSchema);
			models = {userModel: userModel}
		}
		return models
	}
}