import React from 'react';
import { Header } from '../components/Header';

export function ViewUser() {
    const cards = [
        {
            title: 'Nombre del curso #1',
            imageUrl: '/src/img/backgroundLogin.jpg',
            altText: 'Card 1 Image',
        },
        {
            title: 'Nombre del curso #2',
            imageUrl: '/src/img/backgroundLogin.jpg',
            altText: 'Card 2 Image',
        },
        {
            title: 'Nombre del curso #3',
            imageUrl: '/src/img/backgroundLogin.jpg',
            altText: 'Card 3 Image',
        },
        {
            title: 'Nombre del curso #4',
            imageUrl: '/src/img/backgroundLogin.jpg',
            altText: 'Card 4 Image',
        },
        {
            title: 'Nombre del curso #5',
            imageUrl: '/src/img/backgroundLogin.jpg',
            altText: 'Card 5 Image',
        },
    ];

    const userInfo = {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        phone: '1234-5678',
        imageUrl: '/src/img/fotoPerfilDefault.webp',
        altText: 'Profile Picture'
    };

    return (
        <div className="relative">
            <Header></Header>

            <div className="px-6 py-8">
                <div className="mb-5 flex">
                    <div className="mr-5 w-1/2 flex justify-center items-center">
                        <img className="rounded-full w-80 h-80" src={userInfo.imageUrl} alt={userInfo.altText} />
                    </div>
                    <div className="w-1/2">
                        <p className="text-4xl font-bold mb-3">Nombre: {userInfo.name}</p>
                        <p className="text-4xl font-bold mb-3">Correo: {userInfo.email}</p>
                        <p className="text-4xl font-bold">Teléfono: {userInfo.phone}</p>
                    </div>
                </div>

                <h2 className="mb-5 text-2xl text-[#14453D] font-bold underline">Mis cursos:</h2>

                <div className="flex flex-col items-center mx-auto min-h-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cards.map((card, index) => (
                            <div key={index} className="p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
                                <div className="flex-shrink-0 mr-5 w-1/2">
                                    <a href='/menu'>
                                        <img className="rounded-lg w-full h-auto" src={card.imageUrl} alt={card.altText} />
                                    </a>
                                </div>
                                <div className="flex flex-col justify-center items-center w-1/2">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#14453D]">{card.title}</h5>
                                    <a href='/menu' className="inline-block w-3/4 items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-[#14453D] rounded-lg">
                                        Continuar
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
