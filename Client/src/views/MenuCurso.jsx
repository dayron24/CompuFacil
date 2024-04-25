import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Spinner } from '../components/Spinner';
import { useParams } from 'react-router';
import axios from '../api/axios';

export function MenuCurso() {
    const [classes, setClasses] = useState([]);
    const { id } = useParams();

    if (id) {
        sessionStorage.setItem("last_course", id);
    }

    // Retrieve database data
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(`/lesson/${id}`);
                setClasses(response.data);
            } catch (error) {
                console.error("Failed fetching DB data:", error);
            }
        };

        fetchLessons();
    }, [])

    return (
        <div className="relative">
            <Header />
            <div className={`px-6 py-8 flex justify-center items-center flex-col ${classes.length <= 0 ? "min-h-screen" : ""}`}>
                {
                    (classes.length <= 0) ? (
                        <Spinner></Spinner>
                    ) : (
                        <>
                            {
                                classes.map((selected_class, index) => (
                                    <div key={index} className="mx-4 mb-8 w-full flex justify-center items-center flex-col">
                                        <h2 className="text-xl font-bold mb-4">{selected_class.title}</h2>
                                        {selected_class.lessons.map((lesson, lessonIndex) => (
                                            <a key={lessonIndex} href={`/lessons/${lesson._id}`} className="mb-2 inline-block w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[#14453D] hover:bg-emerald-950">
                                                <h2 className="text-lg font-bold">{lesson.information.title}</h2>
                                            </a>
                                        ))}
                                    </div>
                                ))
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
}