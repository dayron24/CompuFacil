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
    const { courseID, userID } = req.body;

    if (!courseID || !userID) {
        res.status(401).json({ error: "Ids not specified" })
        return;
    }

    const result = await userModel.findByIdAndUpdate(userID, {
        $addToSet: { courses: courseID }
    });

    console.log(result);

    console.log(courseID, userID);
    res.status(200).json({})

});

module.exports = router;