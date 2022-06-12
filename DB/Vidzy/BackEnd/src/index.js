import express from 'express';
import config from './config.js';
import fileRouter from './Routers/FileRouter.js';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();
mongoose.connect(config.MONGO_CONECTION_STR);

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use('/api/file/', fileRouter);

app.listen(config.PORT, () => {
    console.log('Server is running');
});

app.all('/*', (req, res) => {
    res.status(400).json('Page not found');
});
