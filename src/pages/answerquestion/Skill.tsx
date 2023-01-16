import { useState, type FC } from 'react'

interface skillProps {
    name: string
    difficulty: number
    setDifficulty: (difficulty: number) => void
}

const Skill: FC<skillProps> = ({name, difficulty, setDifficulty}) => {
  
    return(
    <div className='flex flex-col items-center pb-3 gap-2'>
                    <label className="text-white text-lg" htmlFor="difficulty">{name}</label>
                    <div className='flex gap-3 items-center'>
                        <button
                        type="button"
                        className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${difficulty === 1 ? "bg-indigo-900 hover:bg-indigo-900" : ""}`}
                        onClick={() => setDifficulty(1)}
                        >
                        1
                        </button>
                        <button
                        type="button"
                        className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${difficulty === 2 ? "bg-indigo-900 hover:bg-indigo-900" : ""}`}
                        onClick={() => setDifficulty(2)}
                        >
                        2
                        </button>
                        <button
                        type="button"
                        className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${difficulty === 3 ? "bg-indigo-900 hover:bg-indigo-900" : ""}`}
                        onClick={() => setDifficulty(3)}
                        >
                        3
                        </button>
                        <button
                        type="button"
                        className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${difficulty === 4 ? "bg-indigo-900 hover:bg-indigo-900" : ""}`}
                        onClick={() => setDifficulty(4)}
                        >
                        4
                        </button>
                        <button
                        type="button"
                        className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${difficulty === 5 ? "bg-indigo-900 hover:bg-indigo-900" : ""}`}
                        onClick={() => setDifficulty(5)}
                        >
                        5
                        </button>
                        
                    </div>
                </div>
         )}

export default Skill