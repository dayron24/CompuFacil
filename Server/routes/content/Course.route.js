const express = require("express");
const courseModel = require("../../models/Course");

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

module.exports = router;