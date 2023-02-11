import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo, logoWS } from './assets'
import { Home, CreatePost } from './pages'; 
const App = () => {
  
  return(
    <BrowserRouter>
      <header className='w-full flex justify-between items-center
                        bg-white sm:px-8 px-4  border-b border-b-[#e6ebf4]'>
        
        <Link to='/'>
          <img src={logoWS} alt='logo' className='w-20 object-contain' />
        </Link>
        <h1 className='font-extrabold text-2xl'>WebSession.</h1>
        <Link to='create-post'
          className='font-inter font-medium bg-[#2faaea]
                    text-white px-4 py-2 rounded-md'>
          Create
        </Link>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe]
                      min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>

      </main>

      <footer className='w-full flex justify-between items-center
                        bg-white sm:px-8 px-4 border-t border-t-[#e6ebf4]'>
        
        <Link to='/'>
          <img src={logoWS} alt='logo'  className='w-28 object-contain' />   
        </Link>

        <div className='font-inter font-medium 
                    text-black px-4 py-2 rounded-md'>
          <p>©2023 WebSession.</p>
          <p>Todos os direitos reservados.</p>
        </div>

      </footer>


    </BrowserRouter>
  )
}

export default App