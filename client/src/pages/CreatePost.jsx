import React, { useState,  } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { LogotypeList, PixelartList, OrientalartList } from '../constants';


const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: [],
    resolution: '',
    numberImage: 0,
    styleImage: '',
    
  });

  const styleOptions = [
    { value: '', label: 'None' },
    ...LogotypeList,
    ...PixelartList,
    ...OrientalartList,
  ];


  

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };


  
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt && form.resolution && form.numberImage) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://server-ai-generation-image.vercel.app/api/v1/dalle', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: (form.prompt + form.styleImage),
    resolution: form.resolution,
    numberImage: parseInt(form.numberImage),
  }),
});

const data = await response.json();
if (data && data.image) {
  const newPhotos = data.image.map((image) => `data:image/jpeg;base64,${image.data}`);
  setForm((form) => ({
    ...form,
    photo: newPhotos,
}));
} else {
  alert('API did not return expected data');
}
       
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  console.log(form.photo)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (form.prompt && form.photo) {
      setLoading(true);
  
      console.log(form) 
      try {
        const response = await fetch('https://server-ai-generation-image.vercel.app/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        
        await response.json();
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Insira um prompt e gere pelo menos uma imagem');
    }
  };

  const [selectedArray, setSelectedArray] = useState([]);

  const handleChangeArray = (event) => {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case 'logotype':
        setSelectedArray(LogotypeList);
        break;
      case 'pixelart':
        setSelectedArray(PixelartList);
        break;
      case 'orientalart':
        setSelectedArray(OrientalartList);
        break;
      default:
        setSelectedArray([]);
        break;
    }
  };


  return (
    <section className="max-w-7xl mx-auto">
      
      <div className='border-4 border-[#000050] mt-5 rounded-md px-5 p-5'>
      <div className='border-b-2  border-[#185ed5]'>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Criar imagem</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Crie uma imagem imaginativa por meio do DALL-E AI e compartilhe-a com a comunidade</p>
      </div>

      <form className="mt-8 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col">

          <div className="flex flex-col gap-5">
            <FormField
              labelName="Nome"
              type="text"
              name="name"
              placeholder="Ex., Luiz Fernando"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="Uma pintura a óleo impressionista de girassóis em um vaso roxo…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
              />
          </div>
       

          <div className='flex flex-col mt-5 mb-5 gap-5'>
              
            <div className='flex flex-col gap-1'>
              <FormField
                labelName='Estilo de imagem'
                type='select'
                value={form.styleImage} 
                handleChange={handleChange}
                name='styleImage'
                
                    
                options={selectedArray}
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between mt-0">
                <label className="inline-flex items-center w-1/2  ">
                  <input type="radio" className="form-radio text-blue-500" name="arrayType" value="none" onChange={handleChangeArray} defaultChecked/>
                  <span className="ml-2">Nenhum</span>
                </label>
                <label className="inline-flex items-center w-1/2 ">
                  <input type="radio" className="form-radio text-blue-500" name="arrayType" value="logotype" onChange={handleChangeArray} />
                  <span className="ml-2">Logotipo</span>
                </label>
                <label className="inline-flex items-center w-1/2 ">
                  <input type="radio" className="form-radio text-blue-500" name="arrayType" value="pixelart" onChange={handleChangeArray} />
                  <span className="ml-2">Pixel art</span>
                </label>
                <label className="inline-flex items-center w-1/2 ">
                  <input type="radio" className="form-radio text-blue-500" name="arrayType" value="orientalart" onChange={handleChangeArray} />
                  <span className="ml-2">Oriental art</span>
                </label>
              </div>

              <p className=" text-[#666e75] text-[14px]">** Escolha um estilo de imagem, depois escolha o modelo. **</p>
            </div>
   
            <div className='flex flex-col gap-1'>
              <FormField
                labelName='Resolução'
                type='select'
                name='resolution'
                value={form.resolution}
                handleChange={handleChange}
                placeholder="Escolha a resolução da imagem."
                options={[
                  { label: '', value: '' },
                  { label: '512x512', value: '512x512' },
                  { label: '256x256', value: '256x256' },
                ]}
              />
              <p className=" text-[#666e75] text-[14px]">** Escolha a resolução da imagem. **</p>
              </div>
              
            <div className='flex flex-col gap-1'>
              <FormField
                labelName='Numero de Imagem'
                type='select'
                name='numberImage'
                value={form.numberImage}
                handleChange={handleChange}
                
                options={[
                  { label: '', value: '' },
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                  { label: '4', value: '4'}
                ]}
              />
              <p className="text-[#666e75] text-[14px]">** Escolha quantas imagens você deseja criar. **</p>
            </div>
              
          </div>  


            

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-3 h-full flex justify-center items-center">
            {form.photo.length === 0 && (
              <img
                src={preview}
                alt="preview"
                className="rounded-md w-80 h-80 object-cover"
              />
            )}

              
            <div className="my-4 flex flex-wrap gap-2 justify-center items-center">
              {form.photo.map((imgData, index) => (
                <div key={index} className="w-1/2 md:w-1/3 lg:w-1/4">
                  <img src={imgData} alt={`Generated image ${index + 1}`} className="w-full h-full" />
                </div>
              ))}
            </div>
              
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
            

        </div>

        <div className="mt-5 flex  gap-10">
          <button
            type="button"
            onClick={generateImage}
            disabled={generatingImg}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Criando...' : 'Criar'}
          </button>

          <button
            type="submit"
            className=" text-white bg-[#2faaea] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Compartilhando' : 'Compartilhe com a comunidade'}
          </button>

        </div>

        <div className="mt-1">
          <p className="mt-2 text-[#666e75] text-[14px]">** Depois de criar sua Art, você pode compartilhá-la com outras pessoas da comunidade **</p>
        </div>
      </form>

      </div>

     
      <div id="container-edeaac44da5a21b18aea9bdc07ef5e03"></div>
      
    </section>
    
  );
};

export default CreatePost;