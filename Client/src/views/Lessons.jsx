import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Spinner } from '../components/Spinner';
import { useParams } from "react-router-dom";

import axios from '../api/axios';

export function ViewLessons() {
    const [lesson, setLesson] = useState({});
    const [hasQuestions, setHasQuestions] = useState(false);
    const { id } = useParams();

    // Retrieve database data
    useEffect(() => {
        const fetchLessonContent = async () => {
            try {
                const response = await axios.get(`/lessonContent/${id}`);
                setLesson(response.data.information);
                setHasQuestions(response.data.questions.length > 0);
            } catch (error) {
                console.error("Failed fetching DB data:", error);
            }
        };

        const saveUserCourse = async () => {
            try {
                const body = {
                    courseID: sessionStorage.getItem("last_course"),
                    userID: sessionStorage.getItem("user_id"),
                    total_lessons: sessionStorage.getItem("totalLessons")
                };
                await axios.post(`/course/saveCourse`, body);
            } catch (error) {
                console.error("Failed saving user course:", error);
            }
        }

        fetchLessonContent();
        saveUserCourse();
    }, [])

    const saveFinishedCourse = async () => {
        // Update finished courses

        if (!hasQuestions) {
            try {
                const body = {
                    courseID: sessionStorage.getItem("last_course"),
                    userID: sessionStorage.getItem("user_id"),
                    lessonID: id
                };
                await axios.put(`/course/updateCompletedCourses`, body);
            } catch (error) {
                console.error("Failed saving user course:", error);
            }
        }
    }

    return (
        <div className="relative">
            <Header></Header>

            <>
                {
                    (Object.keys(lesson).length === 0) ? (
                        <div className='flex flex-col items-center justify-center min-h-screen'>
                            <Spinner></Spinner>
                        </div>
                    ) : (
                        <>
                            <div className="px-6 py-8">
                                <div className="mb-5 flex flex-col sm:flex-row gap-2 justify-center items-center">
                                    <div className="shrink max-w-lg order-last sm:order-first">
                                        <img className="w-full max-w-lg img-fluid rounded-lg" src={lesson.image} alt={lesson.title} />
                                    </div>
                                    <div className="max-w-lg">
                                        <p className="text-4xl font-bold"> {lesson.title}</p>
                                    </div>
                                </div>

                                <div className='px-5 py-5 bg-#9dbfaf rounded-lg'>
                                    <p className="text-lg sm:text-l lg:text-xl xl:text-2xl mb-3 text-white font-bold text-center "> {lesson.description} </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="max-w-full h-full py-5">
                                    <a
                                        href={ (hasQuestions) ? `/questions/${id}` : `/home`}
                                        onClick={saveFinishedCourse}
                                        className="justify-center text-white bg-gradient-to-r from-teal-700 to-cyan-950 font-medium rounded-lg text-lg px-7 py-2.5 text-center 
                        hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-800 hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
                                    >
                                        Siguiente
                                    </a>
                                </div>
                            </div>
                        </>
                    )
                }
            </>
        </div>
    );
}
