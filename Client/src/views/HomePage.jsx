import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Spinner } from '../components/Spinner';
import axios from '../api/axios';

const checkLevelExistance = (level_str, levels) => {
    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];

        if (level["name"] == level_str) {
            return level;
        }
    }

    return {};
}

const fillTabsInfo = (data) => {
    let result = [];

    for (let i = 0; i < data.length; i++) {
        const obj = data[i];

        let levelObj = checkLevelExistance(`nivel${obj["level"]}`, result);

        if (Object.keys(levelObj).length === 0) {
            levelObj["name"] = `nivel${obj["level"]}`;
            levelObj["label"] = `Nivel ${obj["level"]}`;
            levelObj["cards"] = [];
        }

        levelObj["cards"].push(
            {
                id: obj["_id"],
                title: obj["title"],
                description: obj["description"],
                imageUrl: obj["image"],
                altText: `Card ${obj["course_number"]} Image`
            }
        );

        if (levelObj["cards"].length <= 1) {
            result.push(levelObj);
        }
    }

    return result;
}

export function HomePage() {
    const [activeTab, setActiveTab] = useState('nivel0');
    const [tabs, setTabs] = useState([]);
    let isLoading = false;

    const handleTabClick = (tabName) => {
        isLoading = true;
        setActiveTab(tabName);
    };

    // Retrieve database data
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("/course");
                const result = fillTabsInfo(response.data);

                setTabs(result);
            } catch (error) {
                console.error("Failed fetching DB data:", error);
            }
        };

        fetchCourses();
    }, [])


    const renderContent = () => {
        const currentTab = tabs.find(tab => tab.name === activeTab);
        if (!currentTab) return null;

        isLoading = false;

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                {currentTab.cards.map((card, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href='/menu'>
                            <img className="rounded-t-lg" src={card.imageUrl} alt={card.altText} />
                        </a>
                        <div className="p-5 bg-yellow-50">
                            <a>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#00ccbe] text-center">{card.title}</h5>
                            </a>
                            <p className="mb-3 font-normal text-[#9dbfaf]">{card.description}</p>
                            <a href={`/menu/${card.id}`} className="inline-block w-full min-w-full max-w-xs items-center justify-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[#09a6a3]">
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

            <div className="flex flex-col items-center px-6 py-8 mx-auto min-h-screen">
                {
                    (tabs.length <= 0 || isLoading) ? (
                        <Spinner></Spinner>
                    ) : (
                        <>
                            <div className="pb-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400">
                                <ul className="flex flex-wrap">
                                    {tabs.map(tab => (
                                        <li key={tab.name} className="">
                                            <a className={`inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${activeTab === tab.name ? 'text-[#9dbfaf] border-[#586994] active' : 'border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'}`} onClick={() => handleTabClick(tab.name)}>
                                                {tab.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div id='card-container' className="p-5 border border-red-800 rounded-lg">
                                {renderContent()}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}
