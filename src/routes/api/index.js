const { Router } = require('express')

const api = Router()

api.get('/', (_, response) => {
  response.json({
    name: 'My Application',
    metadata: {
      version: '1.0.0',
    },
  })
})

module.exports = api
