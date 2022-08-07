const express = require('express')
const app = express()
const database = require('./models')
// import routes
const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRouter')

//import the .env variables
require('dotenv').config()

const cors = require('cors')

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// ROUTES

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

//CONNECT TO THE DATABASE
database.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 4001, () => {
        console.log(`the server is running on ${process.env.PORT || 4001}`);
    })
})


