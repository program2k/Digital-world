const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require('./config/db-connect.js');
const routes = require('./routes');
const cookieParser = require('cookie-parser')
const cors = require('cors');
require('./passport.js')

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true
}))
app.use(cookieParser());
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
dbConnection();

// app.use("/", (req, res) => {
//     res.send("Cong dep trai!");
// });

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}!`);
});
