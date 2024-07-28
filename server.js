const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const routes = require('./routes');
const fileUpload = require('express-fileupload')

dotenv.config();

const app = express();

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles:true
}));

app.use(express.json());
app.use(cors());
connectDB();

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
