import React from 'react'

const ShowError = ({message, styles}: {message: string, styles?: string}) => {
  return (
    <div className={`w-full text-[13px] text-[#e40606] mt-0.5 ${styles}`}>{message}</div>
  )
}

export default ShowError