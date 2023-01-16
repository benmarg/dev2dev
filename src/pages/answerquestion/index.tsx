import { type FC, useState, type FormEvent } from 'react'
import Skill from './skill'

export default function AskQuestion(){
    const [javascriptDifficulty, setJavascriptDifficulty] = useState<number>(0)
    const [typescriptDifficulty, setTypescriptDifficulty] = useState<number>(0)
    const [reactDifficulty, setReactDifficulty] = useState<number>(0)
    const [pythonDifficulty, setPythonDifficulty] = useState<number>(0)
    const [javaDifficulty, setJavaDifficulty] = useState<number>(0)
    const [cppDifficulty, setCppDifficulty] = useState<number>(0)

    function handleSubmit(e : FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(javascriptDifficulty, typescriptDifficulty, reactDifficulty, pythonDifficulty, javaDifficulty, cppDifficulty);
    }

    return(
    <div className='min-h-screen bg-gradient-to-b from-[#7031c9] to-[#151fd5]'>
        <div className='flex flex-col items-center'>
            <h1 className='text-white text-xl font-bold mt-12 mb-6 text-center'>Rate your strength in the below areas on a scale of 1 to 5, with 5 being the strongest <br /> Rate a skill as 0 if you&apos;d prefer not to answer questions on the given subject</h1>
            <form className='flex flex-col w-[40%] gap-4' onSubmit={(e) => handleSubmit(e)}>
                <Skill name="Javascript" difficulty={javascriptDifficulty} setDifficulty={setJavascriptDifficulty} />
                <Skill name="Typescript" difficulty={typescriptDifficulty} setDifficulty={setTypescriptDifficulty} />
                <Skill name="React" difficulty={reactDifficulty} setDifficulty={setReactDifficulty} />
                <Skill name="Python" difficulty={pythonDifficulty} setDifficulty={setPythonDifficulty} />
                <Skill name="Java" difficulty={javaDifficulty} setDifficulty={setJavaDifficulty} />
                <Skill name="C++" difficulty={cppDifficulty} setDifficulty={setCppDifficulty} />  
                <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 mt-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                Submit
                </button>
            </form>
        </div>
    </div>
    )
}
