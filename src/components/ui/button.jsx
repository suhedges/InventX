import React from 'react'

export function Button({ className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${className}`}
      {...props}
    />
  )
}