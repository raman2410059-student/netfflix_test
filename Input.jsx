import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
  return (
    <div className='flex flex-col gap-2 w-full'>
        {label && <label
        className='text-sm text-gray-300 font-medium'
        htmlFor={id}>
          {label}  
            </label>}

            <input
            type= {type}
            className={` w-full
          bg-[#1a1a1a]
          border border-gray-700
          text-white
          placeholder-gray-500
          px-4 py-2
          rounded-md
          transition-all duration-200
          focus:outline-none
          focus:ring-2 focus:ring-red-600
          focus:border-red-600
          ${className}`}
            {...props}
            ref={ref}
            id={id}>
            </input>
    </div>
  )
})

export default Input