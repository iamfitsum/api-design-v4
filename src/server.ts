import express from "express"
import router from "./router";
import morgan from "morgan"
import cors from "cors"
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

// Custom middleware that takes options

// const customLogger = (message) => (req, res, next) => {
//     console.log(`Hello from ${message}`)
//     next()
// }

// app.use(customLogger("custom logger"))

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/", (req, res) => {
    console.log("Hi from the server");
    res.status(200);
    res.json({message: "Hello from the server"});
})

app.use("/api", protect, router)
app.post("/user", createNewUser)
app.post("/signin", signin)

app.use((err, req, res, next) => {
    if(err.type === "auth"){
        res.status(401).json({message: "Unauthorized"})
    } else if (err.type === "input") {
        res.status(400).json({message: "Invalid input"})
    } else {
        res.status(500).json({message: "Internal server error"})
    }
})

export default app;