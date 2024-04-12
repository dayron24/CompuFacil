const express = require("express");
const courseModel = require("../../models/Course");
const lessonModel = require("../../models/Lesson");
const lessonContentModel = require("../../models/LessonContent");
const questionsModel = require("../../models/Questions");

const router = express.Router();

router.post('/', async (req, res) => {

    const body = req.body;

    const search_result_course = await courseModel.findOne({
        course_number: body.req_course_id
    }).lean().exec();

    if (search_result_course == null) {
        res.status(404).json({ error: "Course not found" });
        return;
    }

    const search_result_lesson = await lessonModel.findOne({
        course_id: search_result_course._id,
        class_number: body.req_lesson_id
    }).lean().exec();

    if (search_result_lesson == null) {
        res.status(404).json({ error: "Lesson not found" });
        return;
    }

    const search_result_lessonContent = await lessonContentModel.findOne({
        lesson_id: search_result_lesson._id,
        lessonContent_number: body.req_lessonContent_id
    }).lean().exec();

    if (search_result_lessonContent == null) {
        res.status(404).json({ error: "Lesson not found" });
        return;
    }

    const result = await questionsModel.create({
        lessonContent_id: search_result_lessonContent._id,
        question: body.question,
        answers: body.answers
    })

    res.status(201).json(result);
});

module.exports = router;