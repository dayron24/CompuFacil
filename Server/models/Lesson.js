const mongoose = require("mongoose")

// Hay que buscar el ref del curso por su nivel y curso numero

const lessonScheme = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    },
    class_number: { type: Number },
    title: { type: String }
}, { collection: "lesson" });

module.exports = mongoose.model("lesson", lessonScheme)