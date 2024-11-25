import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
        <div className='w-[550px] flex flex-col bg-[#eee] rounded-xl px-5 py-7'>
            <h1 className='text-[28px] leading-[30px] text-center'>Oops! We are sorry for inconvinience</h1>
            <p className='text-[13px] mt-2 text-center'>Actually! You just have entered the wrong url, you are justredirected to some wrong url. We are really sorry for this. Please click any of the following buttons to navigate through other pages.</p>
            <div className='flex justify-center items-center mt-4 gap-x-2 w-full'>
                <Link to='/' className="text-[14px] px-7 py-3 rounded-3xl bg-[#dadada] hover:bg-gray-300 text-center">Home Page</Link>
                <Link to='/create' className="text-[14px] px-7 py-3 rounded-3xl bg-[#dadada] hover:bg-gray-300 text-center micro:hidden">Create Blog</Link>
            </div>
        </div>
    </div>
  )
}

export default memo(Notfound)