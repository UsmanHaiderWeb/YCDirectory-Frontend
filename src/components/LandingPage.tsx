import React, { memo, useEffect } from 'react'
import { Search } from 'lucide-react'
import ShowAllBlogsPaginated from './ShowAllBlogsPaginated'
import SearchBlog from './SearchBlog'
import { useLocation, useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();
    const location = useLocation()
    let query = decodeURI(location.pathname);
    let whatToSearch = query.split('/search=').join('');

    useEffect(() => {
        (query != '' && !query.includes('/search=')) && navigate('/', { replace: true });
    }, [])


return (
    <div>
        <div className='hidden justify-center items-center flex-col bg-[#EE2B69] py-14 gap-y-3'>
            <div>
                <h4 className='bg-[#FBE843] py-2 px-5 text-[14px]'>Post, Interact and Grow</h4>
            </div>
            <h1 className='uppercase text-[45px] font-bold bg-black max-w-[720px] px-5 py-2 text-center text-white'>Pitch your startup, connect with the world</h1>
            <p className='text-white text-[14px] my-3'>Submit your ideas. Vote on Blogs, And Get noticed in virtual competitions</p>
            <label htmlFor="search" className='flex justify-between items-center bg-[#f7f7f7] px-5 border-black border-[5px] rounded-[50px] mt-2'>
                <input type="text" className='w-96 bg-transparent placeholder:text-black placeholder:font-extrabold py-3' placeholder='Search Blogs' />
                <div className='w-9 h-9 rounded-full flex justify-center items-center bg-black'>
                    <Search size={20} stroke='white' />
                </div>
            </label>
        </div>
        <div className="py-8 flex justify-center items-center flex-col mt-5 mobile:mt-3 micro:mt-3 sm:mx-16 tablet:mx-0 mini:mx-0 mobile:mx-0 micro:mx-0 bg-[#dadada]">
            <h3 className=" pb-[5px] micro:pl-4 w-full text-center">Welcome to YCDirectory</h3>
            <h1 className="md:w-[700px] sm:w-[500px] lgtab:w-[500px] tablet:w-[500px] mini:w-[90vw] mobile:w-[95vw] micro:w-[97vw] text-center lg:text-[2.5vw] sm:text-[31px] lgtab:text-[31px] tablet:text-[31px] mini:text-[30px] mobile:text-[28px] micro:text-[30px] lg:leading-[3vw] sm:leading-[36px] lgtab:leading-[36px] tablet:leading-[36px] mini:leading-[35px] mobile:leading-[32px] micro:leading-[30px] font-semibold micro:px-2">
                Craft narratives that ignite <span className="text-[#DC2626]">inspiration <img src="/inspiration.svg" className="w-[40px] inline-block" /></span>, <span className="text-[#DC2626]">knowledge <img src="/know.svg" className="w-[40px] inline-block" /></span>, and <span className="text-[#DC2626]">entertainment <img src="/entertainment.svg" className="w-[40px] inline-block"/></span>
            </h1>
            <SearchBlog />
        </div>
        <ShowAllBlogsPaginated search={whatToSearch == '/' ? false : true} whatToSearch={whatToSearch} />
    </div>
  )
}

export default memo(LandingPage)