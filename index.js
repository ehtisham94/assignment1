const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }));
const createTable = require('./models/create')
// createTable()

// const insertedRows = await knex('students').insert({ first_name: 'abc', last_name: 'xyz' })
//     console.log(1, insertedRows);

// let getType = (req, res, next) => {
//     let type = req.params._type
//     if (type == 'student' || type == 'book') {
//         req.body._type = type
//         next()
//     } else {
//         res.json({status: 0, message: 'invalid url'})
//     }
// }
// app.use('/:_type', getType, require('./routes/book'))

app.use('/api/student', require('./routes/student'))
app.use('/api/book', require('./routes/book'))

let port = process.env.port || 3001
app.listen(port=port, hostname='0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})