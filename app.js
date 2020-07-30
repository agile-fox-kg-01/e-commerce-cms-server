require('dotenv').config()

const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const {errorHandler} = require('./middlewares/errorHandler');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
if(process.env.NODE_ENV === 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
    })
}

module.exports = app;