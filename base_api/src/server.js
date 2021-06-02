const   express            = require('express');
const { ExceptionHandler } = require('./middlewares/exceptionHandler');

require('dotenv/config')
require('express-async-errors')

const port    = process.env.PORT || 3333;
const app     = express()
const routes  = require('./routes/index')

app.use(express.json())

app.use(routes)

app.use(ExceptionHandler)

app.listen(port,() => console.log(`Listening on port ${port} ...`))