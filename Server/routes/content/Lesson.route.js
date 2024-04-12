const express = require("express");
const courseModel = require("../../models/Course");
const lessonModel = require("../../models/Lesson");

const mongoose = require('mongoose');

const router = express.Router();

router.get('/:courseID', async (req, res) => {
    const courseID = req.params.courseID;

    if (courseID == null || courseID == "") {
        res.status(401).json({ error: "Bad input courseID" })
        return;
    }

    try {
        const result = await lessonModel
        .aggregate([
            {
                $match: {
                    course_id: new mongoose.Types.ObjectId(courseID)
                }
            },
            {
                $lookup: {
                    from: "lessonContent",
                    localField: "_id",
                    foreignField: "lesson_id",
                    as: "lessons"
                }
            }
        ])
        .exec()

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json([])
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

    const result = await lessonModel.create({
        course_id: search_result_course._id,
        class_number: body.class_number,
        title: body.title,
    })

    res.status(201).json(result);
});

module.exports = router;