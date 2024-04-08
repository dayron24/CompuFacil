import React from 'react';
import { Header } from '../components/Header';

export function MenuCurso() {
    const classes = [
        {
            name: 'Clase #1',
            lessons: [
                {
                    name: 'Lección #1',
                    redirectUrl: '#',
                },
                {
                    name: 'Lección #2',
                    redirectUrl: '#',
                },
                {
                    name: 'Lección #3',
                    redirectUrl: '#',
                },
                {
                    name: 'Lección #4',
                    redirectUrl: '#',
                },
                {
                    name: 'Examen #1',
                    redirectUrl: '#',
                },
            ],
        },
        {
            name: 'Clase #2',
            lessons: [
                {
                    name: 'Lección #1',
                    redirectUrl: '#',
                },
                {
                    name: 'Lección #2',
                    redirectUrl: '#',
                },
                {
                    name: 'Lección #3',
                    redirectUrl: '#',
                },
                {
                    name: 'Lección #4',
                    redirectUrl: '#',
                },
                {
                    name: 'Examen #1',
                    redirectUrl: '#',
                },
            ],
        },
    ]

    return (
        <div className="relative">
            <Header></Header>

            <div className="px-6 py-8 flex justify-center items-center flex-col">
                {classes.map((course, index) => (
                    <div key={index} className="mx-4 mb-8 w-full flex justify-center items-center flex-col">
                        <h2 className="text-xl font-bold mb-4">{course.name}</h2>
                        {course.lessons.map((lesson, lessonIndex) => (
                                <a key={lessonIndex} href={lesson.redirectUrl} className="mb-2 inline-block w-1/3 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[#14453D]">
                                    <h2 className="text-lg font-bold">{lesson.name}</h2>
                                </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
