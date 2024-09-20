//This file is for writing data to the database for testing purposes

const db = require("./db.js")

const User = db.getModel().userModel

async function init() {

    try {

        // //Option to delete existing data for full reset
        // await User.deleteMany({})
        
        let user1 = new User({
            userId: "U10001",
            email: "test@gmail.com",
            password_hashed: "pa55w0rd",
            name: "John Smith",
            createdAt: "2024-09-01",
            goals: []
        })
        let user2 = new User({
            userId: "U10002",
            email: "hello@bu.edu",
            password_hashed: "b0st0nuniversity",
            name: "Jane Doe",
            // createdAt: "2024-09-01", // testing the default param in schema works
            goals: []
        })
    
        await Promise.all([
            user1.save(),
            user2.save()
        ])
    
        let users = await User.find({})
    
        console.log(users)

    } catch(error) {

        console.log(error)

    } finally {

        db.closeConnection()

    }
}

init()