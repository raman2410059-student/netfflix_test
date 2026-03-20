import React, { forwardRef, useId } from "react"

const Textarea = forwardRef(function Textarea(
  {
    label,
    rows = 4,
    className = "",
    ...props
  },
  ref
) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm text-gray-300 font-medium"
        >
          {label}
        </label>
      )}

      <textarea
        id={id}
        rows={rows}
        ref={ref}
        className={`
          w-full
          bg-[#1a1a1a]
          border border-gray-700
          text-white
          placeholder-gray-500
          px-4 py-3
          rounded-md
          resize-none
          transition-all duration-200
          focus:outline-none
          focus:ring-2 focus:ring-red-600
          focus:border-red-600 ${className}`}
        {...props}
      />
    </div>
  )
})

export default Textarea