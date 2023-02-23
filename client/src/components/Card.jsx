import React from 'react';

import {download} from '../assets'
import { downloadImage } from '../utils';

const Card = ({_id, name, prompt, photo}) => {
  const numPhotos = photo.length;
  const gridCols = numPhotos === 1 ? "grid-cols-1" : numPhotos === 2 ? "grid-cols-2 grid-rows-1" : numPhotos === 4 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-1';
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'> 
      <div className={`grid ${gridCols} gap-4`}>
        {photo.map((photoUrl, index) => ( // Renderiza cada imagem da array photo
          <img
              key={index} // Adiciona uma chave para o React não dar erro
              className='w-full h-auto object-cover rounded-xl'
              src={photoUrl}
              alt={prompt}
          />
        ))}
      </div>

      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0
                      right-0 bg-[#10131f] m-2 p-4 rounded-md'>
          
          <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>

          <div className='mt-5 flex justify-between items-center gap-2'>
              
              <div className='flex items-center gap-2'>

                  <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center
                                  items-center text-white text-xs font-bold'>
                      {name[0]}
                  </div>

                  <p className='text-white text-sm'>{name}</p>

              </div>

              <button
                  className='outline-none, bg-transparent border-none'
                  type='button'
                  onClick={() => {
                      photo.forEach(photoUrl => downloadImage(_id, photoUrl))
                  }}
              >
                  <img src={download}
                      alt='download'
                      className='w-6 h-6 object-contain invert'
                  />
              </button>
          </div>
      </div>
    </div>
  )
}

export default Card
