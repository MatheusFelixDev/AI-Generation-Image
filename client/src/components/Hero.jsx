import React from 'react'
import { Link } from 'react-router-dom'


const Hero = () => {
    return (

        <div className="text-white w-full h-full sm:px-8 px-4 py-4 flex justify-between items-center bg-hero bg-cover rounded-md flex-wrap" >
            <div className="w-full sm:w-1/2 text-center mx-auto">
                <h1 className="text-5xl font-extrabold my-6 mx-auto py-3">"Turn your imagination into reality with"</h1>
                
                <p className="text-gray-300 text-2xl font-bold my-3 mx-auto py-3" >our AI imaging app!!</p>

                <Link to='create-post'>
                    <button className="bg-blue-500 text-white my-6 mx-auto sm:px-8 px-4 py-4 rounded"
                        href='create-post'
                    >
                        Try it now 🚀
                    </button>
                </Link>
            </div>
        </div>

    )
}

export default Hero