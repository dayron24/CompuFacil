import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Spinner } from '../components/Spinner';
import { useParams } from "react-router-dom";

import axios from '../api/axios';

const fillQuestions = (data) => {

    const questions = data["questions"];
    let result = [];

    for (let i = 0; i < questions.length; i++) {
        result.push({
            title: data["information"]["title"],
            image: data["information"]["image"],
            description: questions[i]["question"],
            answers: questions[i]["answers"],
            id: questions[i]["_id"],
        })
    }

    return result;
}

export function ViewQuestions() {
    const [questions, setQuestions] = useState([]);
    const { id } = useParams();
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Array para almacenar las respuestas seleccionadas por el usuario

    // Retrieve database data
    useEffect(() => {
        const fetchLessonContent = async () => {
            try {
                const response = await axios.get(`/lessonContent/${id}`);
                const result = fillQuestions(response.data);

                setQuestions(result)
            } catch (error) {
                console.error("Failed fetching DB data:", error);
            }
        };

        fetchLessonContent();
    }, [])

    const handleAnswerChange = (questionID, selectedOption) => {
        let updatedAnswers = [...selectedAnswers];
        let elementFound = false;

        for (let i = 0; i < selectedAnswers.length; i++) {
            const element = selectedAnswers[i];

            if (element.id == questionID) {
                elementFound = true;
                updatedAnswers[i].answer = selectedOption;
                break;
            }
        }

        if (!elementFound) {
            updatedAnswers.push({
                id: questionID,
                answer: selectedOption
            })
        }

        setSelectedAnswers(updatedAnswers);
    }

    const Revisar = (question) => {

        const questionID = question.id;
        let selectedAnswer = selectedAnswers.find((answer) => answer.id == questionID);

        if (selectedAnswer.answer && selectedAnswer.answer.isCorrect) {
            alert(`¡Bien, Respuesta Correcta!`);
        } else {
            alert(`¡Intentalo de nuevo, respuesta incorrecta.`);// La respuesta correcta es: ${correctAnswer}`);
        }
    }

    const navigate = useNavigate();

    const saveFinishedCourse = async () => {
        // Update finished courses
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

    const Finalizar = async () => {
        let correctCount = 0;

        selectedAnswers.forEach((select_answer) => {
            if (select_answer.answer.isCorrect) {
                correctCount++;
            }
        })

        await saveFinishedCourse();

        alert(`Has obtenido ${correctCount} respuestas correctas de ${questions.length} totales.`);
        navigate('/home');
    }

    return (
        <div className="relative">
            <Header></Header>

            <div className="flex flex-col justify-center items-center mx-auto gap-3 min-h-screen px-10 py-10">

                {
                    (questions.length <= 0) ? (
                        <div className='flex flex-col items-center justify-center min-h-screen'>
                            <Spinner></Spinner>
                        </div>
                    ) : (
                        <>
                            <h2 className="mb-5 text-2xl text-[#14453D] font-bold underline px-10">Examen</h2>
                            {questions.map((question, index) => (
                                <div key={index} className="p-5 w-1/2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
                                    <div className="flex flex-col justify-center items-start">
                                        <a href={`#`} className="w-full">
                                            <img className="rounded-lg w-full" src={question.image} alt={question.title} />
                                        </a>
                                        <h5 className="my-2 text-2xl font-bold tracking-tight text-slate-100">{question.description}</h5>
                                        <div className="text-1xl font-bold tracking-tight text-slate-100 py-5">
                                            <ul className="choices">
                                                <li>
                                                    <label>
                                                        <input type="radio" name={question.id} value="A" onChange={() => handleAnswerChange(question.id, question.answers[0])} />
                                                        {question.answers[0].answer}
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="radio" name={question.id} value="B" onChange={() => handleAnswerChange(question.id, question.answers[1])} />
                                                        {question.answers[1].answer}
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="radio" name={question.id} value="C" onChange={() => handleAnswerChange(question.id, question.answers[2])} />
                                                        {question.answers[2].answer}
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="radio" name={question.id} value="D" onChange={() => handleAnswerChange(question.id, question.answers[3])} />
                                                        {question.answers[3].answer}
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <button onClick={() => Revisar(question)} className="inline-block w-full items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-[#14453D] rounded-lg">
                                            Revisar
                                        </button>
                                    </div>
                                </div>
                            ))}
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
                        </>
                    )
                }

            </div>
        </div>
    );
}