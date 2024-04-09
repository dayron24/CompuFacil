import React from 'react';
import { Header } from '../components/Header';
import { getLesson, getLessonContent } from "../api/tempData"

export function ViewLessons() {
    const itemInfo = {
        name: 'Mouse',
        imageUrl: '/src/img/mouse.jpg',
        altText: 'Example Picture',
        redirectUrl: '/questions',
        text:'El mouse es un dispositivo de entrada diseñado para manipular objetos en la pantalla de la computadora y ayudarlo a usted, el usuario, a interactuar con la computadora.'
    };

    const lesson = getLesson(1, 1);
    const lesson_info = getLessonContent(lesson, 1);

    return (
        <div className="relative">
            <Header></Header>

            <div className="px-6 py-8">
                <div className="mb-5 flex">
                    <div className="mr-5 w-1/2 flex justify-center items-center ">
                        <img className="w-80 h-80 rounded-lg" src={lesson_info.lesson_image} alt={itemInfo.altText} />
                    </div>
                    <div className="w-1/2 h-1/2 py-20">
                        <p className="text-4xl font-bold mb-3"> {lesson_info.lesson_name}</p>
                    </div>
                </div>

                <div className='px-20 py-20 bg-blue-900 rounded-lg'>
                    <p className="text-3xl mb-3 text-white font-bold text-center "> {lesson_info.lesson_description} </p>
                </div>
            </div>
            <div className="flex justify-center">
                    <div className="max-w-full h-full py-5">
                    <a
                        href={itemInfo.redirectUrl}
                        className="justify-center text-white bg-gradient-to-r from-teal-700 to-cyan-950 font-medium rounded-lg text-md px-5 py-2.5 text-center 
                        hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-800 hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
                        >
                        Siguiente
                    </a>
                </div>
            </div>
        </div>
    );
}
