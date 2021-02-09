require('dotenv').config()

const express = require('express')
const api = require('./routes/api')

function launch(port) {
  const application = express()

  application.use('/api', api)

  application.listen(port, () => {
    console.log(`server is started at http://localhost:${port}`)
  })
}

const { PORT } = process.env
launch(PORT || 8080)