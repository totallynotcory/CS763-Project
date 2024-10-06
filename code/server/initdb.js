// This file is for initializing data to the MongoDB database 

const db = require("./config/db.js")

const User = require("./models/User");
const Goal = require("./models/Goal");
const DailyEntry = require("./models/DailyEntry");

async function init() {
    try {
        // Connect to MongoDB
        await db.connectDB();

        // Option to delete existing data for full reset
        // await User.deleteMany({})
        // await Goal.deleteMany({})
        // await DailyEntry.deleteMany({})

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
            email: "akyee@bu.edu",
            passwordHashed: "password",
            name: "Amanda Yee",
            createdAt: "2024-09-01",
            goals: [goal1, goal2] // Connect default goals to user
        })

        let user2 = new User({
            userId: 10002,
            email: "abbieyl@bu.edu",
            passwordHashed: "password",
            name: "Abbie-Yu Luo"
        })

        let user3 = new User({
            userId: 10003,
            email: "ccerav@bu.edu",
            passwordHashed: "password",
            name: "Chris Ceravolo"
        })

        let user4 = new User({
            userId: 10004,
            email: "elee27@bu.edu",
            passwordHashed: "password",
            name: "Eddie Lee"
        })

        let user5 = new User({
            userId: 10005,
            email: "kenlight@bu.edu",
            passwordHashed: "password",
            name: "Kenny Light"
        })

        let user6 = new User({
            userId: 10006,
            email: "zihaoq@bu.edu",
            passwordHashed: "password",
            name: "Zihao Qian"
        })

        let dailyEntry1 = new DailyEntry({
            dailyEntryId: 1,
            userId: 10001,
            entryDate: "2024-10-04",
            weight: 150,
            steps: 9999,
            sleep: 7.5,
            water: 4,
            exercise: 45
        })
    
        await Promise.all([
            user1.save(), user2.save(), user3.save(),
            user4.save(), user5.save(), user6.save(),
            goal1.save(), goal2.save(),
            dailyEntry1.save()
        ])
    
        let users = await User.find({})
        console.log(users)

        let goals = await Goal.find({})
        console.log(goals)

        let dailyEntries = await DailyEntry.find({})
        console.log(dailyEntries)

    } catch(error) {
        console.log(error)
    } finally {
        db.closeConnection()
    }
}

init()