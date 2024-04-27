import React from "react";

export const Modal_TotalPoints = ({ correctCount, totalQuestion }) => {
    return (
        <>
            <div id="default-modal" tabIndex="-1" aria-hidden="true" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-fit max-w-2xl max-h-full">
                    <div className="relative bg-white shadow rounded-lg bg-lime-200 border-2 border-lime-950">
                        <div className="p-4 md:p-5 space-y-4">
                            <p className="text-l leading-relaxed text-lime-950">
                                Obtuviste {correctCount} de {totalQuestion} respuestas correctas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};