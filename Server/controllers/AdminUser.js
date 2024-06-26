const SingletonDAO = require("../controllers/SingeltonDAO");
const User = require("../models/User");
const CourseModel = require("../models/Course");
const LessonModel = require("../models/Lesson");
const LessonContentModel = require("../models/LessonContent");
const bcrypt = require("bcrypt");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  await SingletonDAO.loginUser(req, res, next);
};

const registerUser = async (req, res, next) => {
  const { email, password, firstName, lastName1, lastName2, carnet } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();

  if (duplicate) {
    console.log("duplicado");
    return res.status(400).json({ msg: "User already exists" });
  }

  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y almacenar el nuevo usuario
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      name: firstName,
      carnet: carnet,
      lastName1: lastName1,
      lastName2: lastName2,
      photo: req.file ? `/uploads/profilePhotos/${req.file.filename}` : "",
      roles: 1597,
    });

    res.status(200).json({ msg: "User created", userId: newUser._id });
  } catch (e) {
    res.status(500).json({ msg: "Server error" + e });
  }
  next();
};

const updatePassword = async (req, res, next) => {
  try {
    const jsonBody = req.body;

    if (
      !jsonBody.usuario ||
      !jsonBody.newPassword ||
      !jsonBody.confirmPassword
    ) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    if (jsonBody.newPassword !== jsonBody.confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const userToUpdate = await User.findOne({ email: jsonBody.usuario });

    if (!userToUpdate) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const hashedPassword = await bcrypt.hash(jsonBody.newPassword, 10);

    await User.updateOne(
      { email: jsonBody.usuario },
      { password: hashedPassword }
    );

    res.status(200).json({ msg: "Password updated" });
  } catch (e) {
    res.status(500).json({ msg: "Server error" + e });
  }
};

//logout
const logout = async (req, res, next) => {
  await SingletonDAO.logout(req, res, next);
};

const profile = async (req, res, next) => {
  await SingletonDAO.profile(req, res, next);
};
const verifyToken = async (req, res, next) => {
  await SingletonDAO.verifyToken(req, res, next);
};


const getUserInformation = async (req, res, next) => {
  const { userID } = req.body;

  const result_user = await User.findById(userID);

  if (!result_user) {
    return res.status(404).json({error: "User not found"});
  }

  const coursesInfo = [];

  for (const courseObj of result_user.courses) {
    const courseInfo = await CourseModel.findById(courseObj.courseId);

    coursesInfo.push({
      id: courseObj.courseId,
      title: courseInfo.title,
      image: courseInfo.image,
      totalLessons: courseObj.total_lessons,
      completedLessons: courseObj.completed_lessons.length
    });
  }

  res.status(200).json({
    name: `${result_user.name} ${result_user.lastName1 || ""} ${result_user.lastName2 || ""}`,
    email: result_user.email,
    photo: result_user.photo,
    courses: coursesInfo
  })
};


module.exports = {
  loginUser,
  registerUser,
  updatePassword,
  verifyToken,
  profile,
  logout,
  getUserInformation,
};
