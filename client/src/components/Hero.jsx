import React from 'react'
import { Link } from 'react-router-dom'


const Hero = () => {
    return (

        <div className="text-white w-full h-full sm:px-8 px-4 py-4 flex justify-between items-center bg-hero bg-cover rounded-md flex-wrap" >
            <div className="w-full sm:w-1/2 text-center mx-auto">
                <h1 className="text-5xl font-extrabold my-6 mx-auto py-3">"Transforme sua imaginação em realidade"</h1>
                
                <p className="text-gray-300 text-3xl font-bold my-3 mx-auto py-3 " >Crie imagens únicas com nossa IA</p>

                <Link to='create-post'>
                    <button className="bg-[#2faaea] text-white my-6 mx-auto sm:px-8 px-4 py-4 rounded"
                        href='create-post'
                    >
                        Crie uma imagem agora 🚀
                    </button>
                </Link>
            </div>
        </div>

    )
}

export default Hero