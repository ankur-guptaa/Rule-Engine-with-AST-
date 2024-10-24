import mongoose from "mongoose";

const nodeSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    left: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    right: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    value: {
        type: String,
        required: true
    }
});

export default nodeSchema;