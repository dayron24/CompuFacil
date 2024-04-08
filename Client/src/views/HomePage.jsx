import React, { useState } from 'react';
import { Header } from '../components/Header';
export function HomePage() {
    const [activeTab, setActiveTab] = useState('nivel0');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const tabs = [
        {
            name: 'nivel0',
            label: 'Nivel 0',
            cards: [
                {
                    title: 'Card 01',
                    description: 'Description for Card 1',
                    imageUrl: '/src/img/backgroundLogin.jpg',
                    altText: 'Card 1 Image',
                },
                {
                    title: 'Card 02',
                    description: 'Description for Card 2',
                    imageUrl: '/src/img/backgroundLogin.jpg',
                    altText: 'Card 2 Image',
                },
                // Add more cards here
            ]
        },
        {
            name: 'nivel1',
            label: 'Nivel 1',
            cards: [
                {
                    title: 'Card 11',
                    description: 'Description for Card 1',
                    imageUrl: '/src/img/backgroundLogin.jpg',
                    altText: 'Card 1 Image',
                },
                {
                    title: 'Card 12',
                    description: 'Description for Card 2',
                    imageUrl: '/src/img/backgroundLogin.jpg',
                    altText: 'Card 2 Image',
                },
                // Add more cards here
            ]
        },
        {
            name: 'nivel2',
            label: 'Nivel 2',
            cards: [
                {
                    title: 'Card 21',
                    description: 'Description for Card 1',
                    imageUrl: '/src/img/backgroundLogin.jpg',
                    altText: 'Card 1 Image',
                },
                {
                    title: 'Card 22',
                    description: 'Description for Card 2',
                    imageUrl: '/src/img/backgroundLogin.jpg',
                    altText: 'Card 2 Image',
                },
                // Add more cards here
            ]
        },
        {
            name: 'nivel3',
            label: 'Nivel 3',
            cards: [
                {
                    title: 'Card 31',
                    description: 'Description for Card 1',
                    imageUrl: '/src/img/backgroundLogin.jpg',
                    altText: 'Card 1 Image',
                },
                {
                    title: 'Card 32',
                    description: 'Description for Card 2',
                    imageUrl: '/src/img/backgroundLogin.jpg',
                    altText: 'Card 2 Image',
                },
                // Add more cards here
            ]
        },
    ];

    const renderContent = () => {
        const currentTab = tabs.find(tab => tab.name === activeTab);
        if (!currentTab) return null;
        
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentTab.cards.map((card, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href='/menu'>
                            <img className="rounded-t-lg" src={card.imageUrl} alt={card.altText} />
                        </a>
                        <div className="p-5">
                            <a>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#0B2027] text-center">{card.title}</h5>
                            </a>
                            <p className="mb-3 font-normal text-[#586994]">{card.description}</p>
                            <a href='/menu' className="inline-block w-full min-w-full max-w-xs items-center justify-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[#14453D]">
                                Iniciar curso
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="relative">
            <Header></Header>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
                <div className="pb-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                        {tabs.map(tab => (
                            <li key={tab.name} className="">
                                <a className={`inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${activeTab === tab.name ? 'text-[#586994] border-[#586994] active' : 'border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'}`} onClick={() => handleTabClick(tab.name)}>
                                    {tab.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-5 border border-red-800 rounded-lg">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
