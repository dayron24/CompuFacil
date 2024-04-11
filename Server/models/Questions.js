const mongoose = require("mongoose")

// Se le pasa el id del contenido de la clase/lección

const questionScheme = new mongoose.Schema({
    lessonContent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lessonContent"
    },
    question: String,
    answers: [
        {
            answer: String,
            isCorrect: Boolean
        }
    ]
}, { collection: "question" });

module.exports = mongoose.model("question", questionScheme)