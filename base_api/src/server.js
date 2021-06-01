require('dotenv/config')

const express = require('express');
const port    = process.env.PORT || 3333;
const app     = express()
const routes  = require('./routes/index')

app.use(express.json())

app.use(routes)

app.listen(port,() => console.log(`Listening on port ${port} ...`))