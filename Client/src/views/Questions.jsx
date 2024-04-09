import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { Header } from '../components/Header';
import testData from "../data/documento.json"
import { getLesson, getLessonQuestions } from "../api/tempData"

export function ViewQuestions() {
    const [selectedAnswers, setSelectedAnswers] = useState(new Array(testData.clases[0].lecciones[0].contenido_leccion[0].preguntas.length).fill('')); // Array para almacenar las respuestas seleccionadas por el usuario

    const questions = [];

    const lesson = getLesson(1, 1);
    const lesson_questions = getLessonQuestions(lesson, 1);

    for (let i = 0; i < lesson_questions.length; i++) {
        const question_info = lesson_questions[i];

        const question = {
            id: i,
            title: question_info.question,
            imageUrl: '/src/img/mouse.jpg',
            altText: 'question 1 Image',
            option1: question_info.answers[0].respuesta,
            option2: question_info.answers[1].respuesta,
            option3: question_info.answers[2].respuesta,
            option4: question_info.answers[3].respuesta,
            redirectUrl: '#'
        }

        questions.push(question)
    }

    const handleAnswerChange = (questionIndex, selectedOption) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = selectedOption;
        setSelectedAnswers(updatedAnswers);
    }

    const Revisar = (question) => {
        const index = question.id;
        const correctAnswer = questions[index].correctAnswer;
        const selectedAnswer = selectedAnswers[index];

        if (selectedAnswer === correctAnswer) {
            alert(`¡Bien, Respuesta Correcta en la pregunta #${index + 1}!`);
        } else {
            alert(`¡Intentalo de nuevo, respuesta incorrecta en la pregunta #${index + 1}.`);// La respuesta correcta es: ${correctAnswer}`);
        }
    }

    const navigate = useNavigate();

    const Finalizar = () => {
        let correctCount = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correctCount++;
            }
        });
        alert(`Has obtenido ${correctCount} respuestas correctas de ${questions.length} totales.`);
        navigate('/home');
    }

    return (
        <div className="relative">
            <Header></Header>
    
            <h2 className="mb-5 text-2xl text-[#14453D] font-bold underline px-10">Examen:</h2>
    
            <div className="flex flex-col items-center mx-auto min-h-screen px-10 py-10">
                <div className="gap-6">
                    {questions.map((question, index) => (
                        <div key={index} className="p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
                            <div className="flex flex-col justify-center items-start">
                                <a href={question.redirectUrl}>
                                    <img className="rounded-lg w-full h-auto" src={question.imageUrl} alt={question.altText} />
                                </a>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{question.title}</h5>
                                <div className="text-1xl font-bold tracking-tight text-white py-5">
                                    <ul className="choices">
                                        <li>
                                            <label>
                                                <input type="radio" name={question.id} value="A" onChange={() => handleAnswerChange(index, question.option1)} />
                                                {question.option1}
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input type="radio" name={question.id} value="B" onChange={() => handleAnswerChange(index, question.option2)} />
                                                {question.option2}
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input type="radio" name={question.id} value="C" onChange={() => handleAnswerChange(index, question.option3)} />
                                                {question.option3}
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input type="radio" name={question.id} value="D" onChange={() => handleAnswerChange(index, question.option4)} />
                                                {question.option4}
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <button onClick={() => Revisar(question)} className="inline-block w-3/4 items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-[#14453D] rounded-lg">
                                    Revisar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    
            <div className="flex justify-center">
                <div className="max-w-full h-full py-5">
                <button
                    onClick={Finalizar}
                    className="justify-center text-white bg-gradient-to-r from-teal-700 to-cyan-950 font-medium rounded-lg text-md px-5 py-2.5 text-center 
                        hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-800 hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
                >
                    Finalizar
                </button>
                </div>
            </div>
        </div>
    );
}