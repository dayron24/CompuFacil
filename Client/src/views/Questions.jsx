import React from 'react';
import { Header } from '../components/Header';

export function ViewQuestions() {
    const questions = [
        {
            id: '1',
            title: 'Como se llama este dispositivo?',
            imageUrl: '/src/img/mouse.jpg',
            altText: 'question 1 Image',
            option1: 'Option 11',
            option2: 'Option 21',
            option3: 'Option 31',
            option4: 'Option 41',
            redirectUrl: '#'
        },
        {
            id: '2',
            title: 'Pregunta #2',
            imageUrl: '/src/img/mouse.jpg',
            altText: 'question 2 Image',
            option1: 'Option 12',
            option2: 'Option 22',
            option3: 'Option 32',
            option4: 'Option 42',
            redirectUrl: '#'
        },
        {
            id: '3',
            title: 'Pregunta #3',
            imageUrl: '/src/img/mouse.jpg',
            altText: 'question 3 Image',
            option1: 'Option 13',
            option2: 'Option 23',
            option3: 'Option 33',
            option4: 'Option 43',
            redirectUrl: '#'
        },
        {
            id: '4',
            title: 'Pregunta #4',
            imageUrl: '/src/img/mouse.jpg',
            altText: 'question 4 Image',
            option1: 'Option 14',
            option2: 'Option 24',
            option3: 'Option 34',
            option4: 'Option 44',
            redirectUrl: '#'
        },
        {
            id: '5',
            title: 'Pregunta #5',
            imageUrl: '/src/img/mouse.jpg',
            altText: 'question 5 Image',
            option1: 'Option 15',
            option2: 'Option 25',
            option3: 'Option 35',
            option4: 'Option 45',
            redirectUrl: '#'
        },
    ];

    return (
        <div className="relative">
            <Header></Header>

            <h2 className="mb-5 text-2xl text-[#14453D] font-bold underline px-10">Examen:</h2>

                <div className="flex flex-col items-center mx-auto min-h-screen px-10 py-10">
                    <div className="gap-6">
                        {questions.map((question, index) => (
                            <div key={index} className="p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
                                <div className="flex flex-col justify-center items-center">
                                    <a href={question.redirectUrl}>
                                        <img className="rounded-lg w-full h-auto" src={question.imageUrl} alt={question.altText} />
                                    </a>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{question.title}</h5>
                                    <div className="text-1xl font-bold tracking-tight text-white py-5">
                                    <ul class="choices">
                                        <li>
                                            <label
                                                ><input type="radio" name={question.id} value="A" />
                                                     {question.option1}
                                                    </label>
                                        </li>
                                        <li>
                                            <label
                                                ><input type="radio" name={question.id} value="B" />
                                                {question.option2}
                                                </label>
                                        </li>
                                        <li>
                                            <label
                                                ><input type="radio" name={question.id} value="C" />
                                                    {question.option3}
                                                </label>
                                        </li>
                                        <li>
                                            <label
                                                ><input type="radio" name={question.id} value="D" />
                                                {question.option4}
                                            </label>
                                        </li>
                                    </ul>
                                    </div>
                                    <a href={question.redirectUrl} className="inline-block w-3/4 items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-[#14453D] rounded-lg">
                                        Revisar
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            <div className="flex justify-center">
                    <div className="max-w-full h-full py-5">
                    <a
                        href={"/lessons"}
                        className="justify-center text-white bg-gradient-to-r from-teal-700 to-cyan-950 font-medium rounded-lg text-md px-5 py-2.5 text-center 
                        hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-800 hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
                        >
                        Finalizar
                    </a>
                </div>
            </div>
        </div>
    );
}
