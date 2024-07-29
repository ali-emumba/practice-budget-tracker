import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})


import connectDB from './db/index.js'
import { app } from "./app.js";


connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.error("MONGODB CONNECTION ERROR --  connection failed ---- ", error);
    process.exit(1);
});