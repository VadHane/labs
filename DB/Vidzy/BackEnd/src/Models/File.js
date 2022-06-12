import Mongoose from "mongoose";

const videoSchema = new Mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    genre: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const videoModel = Mongoose.model('video', videoSchema);

export default videoModel;