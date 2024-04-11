const express = require("express");
const courseModel = require("../../models/Course");
const lessonModel = require("../../models/Lesson");
const lessonContentModel = require("../../models/LessonContent");
const questionsModel = require("../../models/Questions");

const router = express.Router();

router.get('/:lessonContentID', async (req, res) => {
    const lessonContentID = req.params.lessonContentID;

    if (lessonContentID == null || lessonContentID == "") {
        res.status(401).json({ error: "Bad input lessonContentID" })
        return;
    }

    try {
        const information = await lessonContentModel.find(
            { _id: lessonContentID }
        )

        if (information.length <= 0) {
            res.status(401).json({ error: "Lesson content not found" })
            return;
        }

        const questions = await questionsModel.find(
            { lessonContent_id: lessonContentID }
        ).select("question answers")

        res.status(200).json({
            information: information[0].information,
            questions
        });
    } catch (error) {
        res.status(404).json({})
    }
})

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

    const result = await lessonContentModel.create({
        lesson_id: search_result_lesson._id,
        information: body.information
    })

    res.status(201).json(result);
});

module.exports = router;