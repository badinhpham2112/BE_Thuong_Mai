const express = require("express");
const dotenv = require('dotenv');
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
const port = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())


routes(app);



mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('connect DB success!');
    })

.catch((err) => {
    console.log(err)
})



app.listen(port, () => {
    console.log('server is running in port:', +port);
})