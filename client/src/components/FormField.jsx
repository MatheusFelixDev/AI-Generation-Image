import React from 'react';

const FormField = ({labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe, options}) => {
    return (
      <div>
        <div className='flex items-center gap-2 mb-2'>
          <label
            htmlFor={name}
            className='block text-sm font-medium text-gray-900'
          >
            {labelName}
          </label>
  
          {isSurpriseMe && (
            <button
              type='button'
              onClick={handleSurpriseMe}
              className='font-semibold text-xs bg-[#ececF1] py-1 px-2 rounded-[5px] text-black'
            >
              Surprienda-me
            </button>
          )}
        </div>
  
        {type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            required
            className='bg-gray-50 border border-[#2faaea] text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[4649ff] outline-none block w-full p-3'
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required
            className='bg-gray-50 border border-[#2faaea] text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[4649ff] outline-none block w-full p-3'
          />
        )}
      </div>
    );
  };
  
 

export default FormField