import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Spinner } from '../components/Spinner';

import axios from '../api/axios';

export function ViewUser() {
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [coursesList, setCoursesList] = useState([]);

    const userId = sessionStorage.getItem("user_id" || null);

    // Retrieve database data
    useEffect(() => {
        const fetchLessonContent = async () => {
            try {
                const response = await axios.post(`/login/getInformation`, {userID: userId});
                if (response.data) {
                    setUserInfo(response.data);
                    setCoursesList(response.data.courses);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed fetching DB data:", error);
            }
        };
        fetchLessonContent();
    }, [])

    return (
        <div className="relative">
            <Header></Header>

            <div className="px-6 py-8">
                <div className="mb-5 flex">
                    <div className="mr-5 w-1/2 flex justify-center items-center">
                        <img className="rounded-full w-80 h-80" src={userInfo.photo || "/src/img/fotoPerfilDefault.webp"} alt="profile" />
                    </div>
                    <div className="w-1/2 pt-3">
                        <p className="text-4xl font-bold mb-3">Nombre:</p>
                        <p className="text-3xl font-bold mb-3">{userInfo.name}</p>
                        <p className="text-4xl font-bold mb-3 mt-5">Correo:</p>
                        <p className="text-3xl font-bold mb-3">{userInfo.email}</p>
                    </div>
                </div>

                <h2 className="mb-5 text-2xl text-[#14453D] font-bold underline">Mis cursos:</h2>

                <div className="flex flex-col items-center mx-auto min-h-screen">

                    {
                        (isLoading) ? (
                            <Spinner></Spinner>
                        ) : (
                            <>
                                {
                        (coursesList.length == 0) ? (
                            <div className='mt-5' style={{userSelect: "none"}}>
                                <span className="bg-red-100 text-red-800 text-lg font-medium me-2 px-4 py-3 rounded dark:text-red-400 border border-red-400 inline-flex items-center">
                                    <span className="pr-2 material-icons">error_outline</span>
                                    No se encontraron cursos
                                </span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {coursesList.map((course, index) => (
                                    <div key={index} className="p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
                                        <div className="flex-shrink-0 mr-5 w-1/2">
                                            <a href={`/menu/${course.id}`}>
                                                <img className="rounded-lg w-full h-auto" src={course.image} alt={course.title} />
                                            </a>
                                        </div>
                                        <div className="flex flex-col justify-center items-center w-1/2">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#ffffff]">{course.title}</h5>
                                            <a href={`/menu/${course.id}`} className="inline-block w-full items-center justify-center px-3 py-2 text-md font-medium text-center text-white bg-[#14453D] rounded-lg">
                                                Continuar
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
