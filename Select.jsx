import React, {forwardRef, useId} from 'react'

const Select = forwardRef(function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='flex flex-col gap-2 w-full'>
        {label && <label
        htmlFor={id}
        className='text-sm text-gray-300 font-medium'>
            </label>}

         <select
         id={id}
         ref={ref}
         className={` w-full
          bg-[#1a1a1a]
          border border-gray-700
          text-white
          px-4 py-2
          rounded-md
          transition-all duration-200
          focus:outline-none
          focus:ring-2 focus:ring-red-600
          focus:border-red-600${className}`}
         {...props}>
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
         </select>
    </div>
  )
})

export default Select