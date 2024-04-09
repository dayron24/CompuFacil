import React from 'react';
import { Header } from '../components/Header';
import testData from "../data/documento.json"
export function MenuCurso() {
    // Aquí debes tener tu JSON con la estructura proporcionada
    const classes = testData.clases;

    return (
        <div className="relative">
            <Header />
            <div className="px-6 py-8 flex justify-center items-center flex-col">
                {classes.map((clase, index) => (
                    <div key={index} className="mx-4 mb-8 w-full flex justify-center items-center flex-col">
                        <h2 className="text-xl font-bold mb-4">{clase.nombre}</h2>
                        {clase.lecciones.map((leccion, lessonIndex) => (
                            <a key={lessonIndex} href={`/questions/${index}/${lessonIndex}`} className="mb-2 inline-block w-1/3 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[#14453D]">
                                <h2 className="text-lg font-bold">{leccion.nombre}</h2>
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}