const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const router = express.Router();

const port = process.env.PORT || 5000

router.get("/", (req, res) => {
    res.send("TESTTTTTTTTT");
})

app.use(router)

app.listen(port, () => {
    console.log("Server is listening on port", port)
})
