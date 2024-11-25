import React, { memo } from 'react'

const LoaderSpinner = () => {
  return (
    <div className='animate-spin rounded-full h-10 w-10 border-2 border-[#dadada] border-b-blue-500'></div>
  )
}

export default memo(LoaderSpinner)