//This file is for testing connection to the database.  It will print out data to the console.

const db = require("./db.js")

const User = db.getModel().userModel

async function consoleTest() {
    try {

        let users = await User.find({})
        console.log(users)

    } catch (error) {

        console.log(error)

    } finally {

        db.closeConnection()
        
    }
}

consoleTest()
