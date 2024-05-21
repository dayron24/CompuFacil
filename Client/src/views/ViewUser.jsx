import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Spinner } from '../components/Spinner';
import axios from '../api/axios';
import jsPDF from 'jspdf';
//import 'jspdf-autotable';
import certificadoImg from '../img/certificate_background.png'; // Importa tu imagen
import fotoPerfilDefault from '../img/fotoPerfilDefault.webp';
export function ViewUser() {
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [coursesList, setCoursesList] = useState([]);

    const userId = sessionStorage.getItem("user_id" || null);
    const photoPerfil = fotoPerfilDefault;
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
    }, []);
    const generatePDF = (course) => {
        const doc = new jsPDF('landscape', 'mm', [200, 356]);

        // Cargar la imagen y convertirla en base64

            const loadImage = (src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/png'));
                    };
                });
            };
                // Obtener la fecha actual
            const getCurrentDate = () => {
                const today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
                const yyyy = today.getFullYear();
                return `${dd}/${mm}/${yyyy}`;
            };
            loadImage(certificadoImg).then((imgData) => {
                doc.addImage(imgData, 'PNG', 0, 0, 356, 200); // Ajusta las dimensiones según sea necesario
    
                // Título del certificado
                doc.setFontSize(26);
                doc.setFont('helvetica', 'bold');
                doc.text('Certificado de completitud de curso', 178, 40, { align: 'center' });
    
                // Información del usuario
                doc.setFontSize(20);
                doc.setFont('helvetica', 'normal');
                doc.text(`Nombre: ${userInfo.name}`, 178, 70,{ align: 'center' });
                doc.text(`Correo: ${userInfo.email}`, 178, 90,{ align: 'center' });
    
                // Información del curso
                doc.text(`Curso: ${course.title}`, 178, 110,{ align: 'center' });
                doc.text(`Progreso: ${(course.completedLessons / course.totalLessons) * 100}%`, 178, 130,{ align: 'center' });
                

                // Fecha
                const currentDate = getCurrentDate();
                doc.text(`Fecha: ${currentDate}`, 178, 150, { align: 'center' });

                        // Pie de página
                doc.setFontSize(12);
                doc.text('Este es un certificado generado automáticamente por CompuFacil.', 178, 190, { align: 'center' });

            // // Añadir tabla de contenido del curso
            // doc.autoTable({
            //     startY: 100,
            //     head: [['Lección', 'Estado']],
            //     body: course.lessons.map((lesson, index) => [lesson.title, lesson.completed ? 'Completada' : 'Pendiente']),
            // });

            // Pie de página
            //doc.setFontSize(12);
            //doc.text('Este es un certificado generado automáticamente.', 105, 280, { align: 'center' });

            // Guardar el PDF
            doc.save(`${course.title}_Certificado.pdf`);
        });

    };

    return (
        <div className="relative">
            <Header />

            <div className="px-6 py-8">
                <div className="mb-5 flex gap-4 flex-wrap">
                    <div className="flex justify-center items-center grow lg:max-w-sm">
                        <img className="rounded-full w-80" src={photoPerfil} alt="profile" />
                    </div>
                    <div className="grow shrink pt-3">
                        <p className="text-2xl sm:text-2xl font-bold mb-3">Nombre:</p>
                        <p className="text-xl sm:text-3xl font-bold mb-3">{userInfo.name}</p>
                        <p className="text-2xl sm:text-2xl font-bold mb-3 mt-5">Correo:</p>
                        <p className="text-xl sm:text-3xl font-bold mb-3">{userInfo.email}</p>
                    </div>
                </div>

                <h2 className="mb-5 text-2xl text-[#09a6a3] font-bold underline">Mis cursos:</h2>

                <div className="flex flex-col items-center mx-auto min-h-screen">
                    {
                        isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                {
                                    coursesList.length === 0 ? (
                                        <div className='mt-5' style={{userSelect: "none"}}>
                                            <span className="bg-red-100 text-red-800 text-lg font-medium me-2 px-4 py-3 rounded dark:text-red-400 border border-red-400 inline-flex items-center">
                                                <span className="pr-2 material-icons">error_outline</span>
                                                No se encontraron cursos
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {coursesList.map((course, index) => (
                                                <div key={index} className="p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                                                    <div className='flex flex-wrap xl:flex-nowrap mb-5 gap-2'>
                                                        <div className="basis-full">
                                                            <img className="rounded-lg" src={course.image} alt={course.title} />
                                                        </div>
                                                        <div className="basis-full flex flex-col justify-between">
                                                            <h5 className="mb-2 text-lg sm:text-2xl xl:text-3xl font-bold tracking-tight text-[#ffffff]">{course.title}</h5>
                                                            <div>
                                                                <span className='font-bold tracking-tight text-[#ffffff] text-base sm:text-2xl mb-1'>Progreso del curso:</span>
                                                                <div className="w-full h-fit bg-gray-200 rounded-full dark:bg-gray-700">
                                                                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${(course.completedLessons / course.totalLessons) * 100}%`}}>{`${(course.completedLessons / course.totalLessons) * 100}%`}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href={`/menu/${course.id}`} className="inline-block w-full items-center justify-center px-3 py-2 text-lg font-medium text-center text-white bg-[#237b79] rounded-lg">
                                                        Continuar
                                                    </a>
                                                    <button onClick={() => generatePDF(course)} className="mt-2 w-full items-center justify-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-600 rounded-lg">
                                                        Descargar Certificado
                                                    </button>
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

