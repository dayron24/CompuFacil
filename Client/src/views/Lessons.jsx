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
                    userID: sessionStorage.getItem("user_id")
                };
                await axios.post(`/course/saveCourse`, body);
            } catch (error) {
                console.error("Failed saving user course:", error);
            }
        }

        fetchLessonContent();
        saveUserCourse();
    }, [])

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
                                <div className="mb-5 flex">
                                    <div className="mr-5 w-1/2 flex justify-center items-center ">
                                        <img className="w-80 h-80 rounded-lg" src={lesson.image} alt={lesson.title} />
                                    </div>
                                    <div className="w-1/2 h-1/2 py-20">
                                        <p className="text-4xl font-bold mb-3"> {lesson.title}</p>
                                    </div>
                                </div>

                                <div className='px-20 py-20 bg-blue-900 rounded-lg'>
                                    <p className="text-3xl mb-3 text-white font-bold text-center "> {lesson.description} </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="max-w-full h-full py-5">
                                    <a
                                        href={ (hasQuestions) ? `/questions/${id}` : `/home`}
                                        className="justify-center text-white bg-gradient-to-r from-teal-700 to-cyan-950 font-medium rounded-lg text-md px-5 py-2.5 text-center 
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
