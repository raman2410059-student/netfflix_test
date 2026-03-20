import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-red-600 hover:bg-red-700",
  textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button className={`px-6 py-2
        rounded-md
        font-medium
        transition-all duration-200 ease-in-out
        hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed
    ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button