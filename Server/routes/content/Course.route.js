const express = require("express");
const courseModel = require("../../models/Course");
const userModel = require("../../models/User");

const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await courseModel.find();
    res.status(200).json(result);
})

router.post('/', async (req, res) => {

    const body = req.body;

    const result = await courseModel.create(body)
    res.status(201).json(result);
});

router.post('/saveCourse', async (req, res) => {
    const { courseID, userID, total_lessons } = req.body;

    if (!courseID || !userID || !total_lessons) {
        res.status(401).json({ error: "Ids not specified" })
        return;
    }

    const result = await userModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(String(userID)), "courses.courseId": { $ne: courseID } },
        { $push: { courses: { courseId: courseID, total_lessons: total_lessons, completed_lessons: [] } } },
        { new: true }
    );

    res.status(200).json(result)
});

router.put('/updateCompletedCourses', async (req, res) => {
    const { courseID, userID, lessonID } = req.body;

    if (!courseID || !userID || !lessonID) {
        res.status(401).json({ error: "Ids not specified" })
        return;
    }

    const result = await userModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(String(userID)), "courses.courseId": { $eq: courseID } },
        { $addToSet: { "courses.$.completed_lessons": lessonID } },
        { new: true }
    );

    res.status(200).json(result)
})

module.exports = router;