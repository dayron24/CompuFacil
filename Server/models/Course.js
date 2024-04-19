const mongoose = require("mongoose")

// Se crea el curso

const courseScheme = new mongoose.Schema({
    level: { type: Number },
    course_number: { type: Number },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    audio: { type: String },
}, { collection: "course" });

module.exports = mongoose.model("course", courseScheme)