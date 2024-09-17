const db = require("./db.js")

const User = db.getModel().userModel

async function consoleTest() {

    let users = await User.find({})

    console.log(users)
}

consoleTest()