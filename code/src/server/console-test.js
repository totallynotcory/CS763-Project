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
