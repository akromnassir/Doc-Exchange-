const mongoose = require("mongoose");
const {FileStatus} = require("../utils/enums")
const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    type:{
        type: String,
        enum: Object.values(FileStatus),
        default: FileStatus.PENDING,
    },
    seen: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Notification", NotificationSchema);
