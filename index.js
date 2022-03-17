const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }));
const createTable = require('./models/create')
createTable()

app.use('/api/student', require('./routes/student'))
app.use('/api/book', require('./routes/book'))

let port = process.env.port || 3001
app.listen(port=port, hostname='0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})