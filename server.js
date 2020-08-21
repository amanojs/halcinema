const express = require("express")
const path = require("path")
const debug = require("debug")("app")
const chalk = require("chalk")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const app = express()
const PORT = 3000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "client"))
app.use("/", express.static(path.join(__dirname, "static")))
app.use(morgan("dev"))
app.use(bodyParser())

// routing setup
const adminRouter = require("./src/routes/adminRoutes")()

app.use("/admin", adminRouter)

app.get("/", (req, res) => {
    res.send("hello halcinema")
})

app.listen(PORT, () => {
    debug(`server listen on ${chalk.yellow(PORT)} PORT.`)
})