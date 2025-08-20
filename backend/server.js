const express = require('express')
const {PORT} = require('./config');
const router = require('./routes');
const dbConnect = require('./database');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express()

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173']
  }

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));

app.use(router)
app.use(errorHandler)
app.use('/storage', express.static('storage'))

dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})