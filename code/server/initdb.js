//This file is for writing data to the database for testing purposes

const db = require("./db.js")

const User = db.getModel().userModel
const Goal = db.getModel().goalModel

async function init() {
    try {
        // Option to delete existing data for full reset
        // await User.deleteMany({})
        // await Goal.deleteMany({})

        let goal1 = new Goal({
            goalId: 50001,
            type: "sleep",
            targetValue: 8,
            unit: "hours",
            createdAt: "2024-09-10",
            progress: [{date: new Date("2024-09-11"), value: 7.5},
                        {date: new Date("2024-09-12"), value: 8}]
        })
        
        let goal2 = new Goal({
            goalId: 50002,
            type: "steps",
            targetValue: 9000,
            unit: "steps",
            // will use defaults for createdAt and progress
        })

        let user1 = new User({
            userId: 10001,
            email: "test@gmail.com",
            passwordHashed: "pa55w0rd",
            name: "John Smith",
            createdAt: "2024-09-01",
            goals: [goal1, goal2]
        })

        let user2 = new User({
            userId: 10002,
            email: "hello@bu.edu",
            passwordHashed: "b0st0nuniversity",
            name: "Jane Doe",
            // createdAt: "2024-09-01", // testing the default param in schema works
            goals: []
        })
    
        await Promise.all([
            user1.save(),
            user2.save(),
            goal1.save(),
            goal2.save()
        ])
    
        let users = await User.find({})
        console.log(users)

        let goals = await Goal.find({})
        console.log(goals)

    } catch(error) {
        console.log(error)
    } finally {
        db.closeConnection()
    }
}

init()