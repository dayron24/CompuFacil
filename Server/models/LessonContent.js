const mongoose = require("mongoose")

// Se le pasa el id de la clase/lección

const lessonContentScheme = new mongoose.Schema({
    lesson_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lesson"
    },
    lessonContent_number: Number,
    information: {
        title: String,
        description: String,
        image: String
    }
}, { collection: "lessonContent" });

module.exports = mongoose.model("lessonContent", lessonContentScheme)