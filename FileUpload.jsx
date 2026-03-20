import React, {forwardRef, useId} from 'react'

const FileUpload = forwardRef(function FileUpload({
    label,
    className='',
    ...props
}, ref) {
    const id = useId()
  return (
    <div className=''>
        {label && <label className=''
                         htmlFor={id}>
                            {label}
            </label>}
            <input
            type='file'
            id={id}
            ref={ref}
            className={`w-full
          bg-[#1a1a1a]
          border border-gray-700
          text-gray-300
          file:bg-red-600
          file:text-white
          file:px-4
          file:py-2
          file:mr-4
          file:rounded-md
          file:border-0
          rounded-md
          transition-all duration-200
          focus:outline-none
          focus:ring-2 focus:ring-red-600
          focus:border-red-600${className}`}
            {...props}>
            </input>
    </div>
  )
})

export default FileUpload