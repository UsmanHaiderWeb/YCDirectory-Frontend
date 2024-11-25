import React, { memo, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import ReviewBlog from './ReviewBlog'
import { useQuery } from '@tanstack/react-query'
import { Link, Params, useParams } from 'react-router-dom'
import request from 'graphql-request'
import { BlogInterface, reviewType, SingleBlogs } from './api/GraphqlCalls'
import { Rating } from '@mui/material'
import LikeBlog from './LikeBlog'
import SaveBlog from './SaveBlog'
import TopBlogWriting from './TopBlogWriting'
import { StoreType } from "./ReduxStore/Store";
import { useSelector } from "react-redux";
import LoaderSpinner from "./LoaderSpinner";


const BlogPage = () => {
    const { id } = useParams<Params>();
    const myData = useSelector((state: StoreType) => state.myDataSlice);
    const shouldFetchAppDataSlice = useSelector((state: StoreType) => state.shouldFetchAppDataSlice);
    const { data, isPending, isError, refetch }: {data: undefined | {getSingleBlog: BlogInterface}, isPending: boolean, isError: boolean, error: any, refetch: any} = useQuery({
        queryKey: ['Blog', id],
        queryFn: () => request('https://ycdirectory-backend.vercel.app/graphql', SingleBlogs, {id: id}),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: shouldFetchAppDataSlice,
        retry: true
    })    

    useEffect(() => {
        window.scrollTo(0, 0);
        
        return () => {
            window.scrollTo(0, 0);
        }
    }, [])
    

    if(isPending || isError){
        return (            
            <div className='bg-[#F2F2F2] z-10 justify-center items-center flex w-full h-[80vh]'>
                <LoaderSpinner />
            </div>
        )
    }

  return (
    <div className='flex justify-center items-center flex-col'>
        <div className='w-full flex justify-center items-center flex-col py-4 gap-y-3'>
            <div>
                <h4 className='bg-[#FBE843] py-2 px-5 text-[14px] micro:text-[12px]'>Founder Usman Haider</h4>
            </div>
            <h1 className='uppercase text-[45px] leading-[50px] tablet:text-[40px] tablet:leading-[45px] mini:text-[32px] mini:leading-[38px] mobile:text-[28px] mobile:leading-[35px]  micro::text-[40px] micro::leading-[45px] font-bold max-w-[720px] px-5 text-center'>{data.getSingleBlog.title && 'Job Portal | Get Hired'}</h1>
            <p className='text-[13px] micro:text-[12px] text-center w-3/5 tablet:w-[400px] mini:w-[80%] mobile:w-[85%] micro:w-[90%]'>Please submit your ideas. Vote on Blogs, And Get noticed in virtual competitions. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Submit your ideas. Vote on Blogs, And Get noticed in virtual competitions</p>
            <div className='mini:flex mobile:flex micro:flex tablet:flex justify-center items-center gap-x-3 hidden'>
                <SaveBlog />
                <LikeBlog />
            </div>
        </div>
        <div className='flex justify-between items-center gap-x-3 mt-5 w-full sm:px-20 px-6 mini:px-6 mobile:px-4 micro:px-3'>
            <Link to={myData?._id == data.getSingleBlog.createdBy._id ? `/${myData?.username}/dashboard` : `/creators/${data.getSingleBlog.createdBy._id}`} className='flex justify-start items-center gap-x-3 mt-5'>
                <div>
                    <img src={data.getSingleBlog.createdBy.image || '/alt.png'} className='w-16 h-16 mobile:w-14 mobile:h-14 micro:w-12 micro:h-12 rounded-full object-cover' />
                </div>
                <div>
                    <div className='text-[18px] micro:text-[16px] leading-4 font-semibold'>{data.getSingleBlog.createdBy.username}</div>
                    <div className='text-[16px] micro:text-[14px]'>{data.getSingleBlog.createdBy.email}</div>
                </div>
            </Link>
            <div className='tablet:block mini:block hidden'>
              <Link to={`/creators/${data.getSingleBlog.createdBy._id}`} className="text-[14px] px-7 mini:px-5 py-3 rounded-3xl bg-[#dadada] hover:bg-gray-300">See Profile</Link>
            </div>
            <div className='mini:hidden mobile:hidden micro:hidden tablet:hidden flex justify-center items-center gap-x-3'>
                <SaveBlog />
                <LikeBlog />
            </div>
        </div>
        <div className='mt-6'>
            <img src={data.getSingleBlog.image} className='max-h-screen rounded-2xl micro:rounded-none mobile:rounded-none w-[90vw] micro:w-full object-cover' />
        </div>
        <div className='w-full mt-10'>
            <h1 className='my-5 micro:mb-0 mobile:mb-2 text-[40px] leading-[48px] mobile:text-[30px] mobile:leading-[35px] micro:text-[30px] micro:leading-[35px] text-black font-bold sm:px-14 px-6 mobile:px-4 micro:px-3'>Description about the blog</h1>
            <ul className='sm:pl-32 pl-8 mobile:pl-4 micro:pl-2 sm:pt-5 pt-2 flex justify-center items-start flex-col gap-y-5'>
                <li className='sm:list-decimal pl-2 mini:text-[15px] mobile:text-[14px] micro:text-[13px]'>{data.getSingleBlog.description}</li>
            </ul>
        </div>
        {data.getSingleBlog.reviews?.length > 2 &&
            <div className='w-full overflow-hidden mt-10 pointer-events-none'>
                <h1 className='my-5 text-[40px] mobile:text-[30px] mobile:leading-[35px] micro:text-[30px] micro:leading-[35px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3'>Blog Reviews</h1>
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 1500,
                        }),
                    ]}
                >
                    <CarouselContent className={`gap-5 ${data.getSingleBlog.reviews?.length < 3 ? 'justify-start' : 'justify-center micro:justify-start mobile: mini:justify-start'}`}>
                        {[...data.getSingleBlog.reviews, ...data.getSingleBlog.reviews, ...data.getSingleBlog.reviews, ...data.getSingleBlog.reviews].map((i: reviewType, idx: number) => (
                            <CarouselItem key={`${i}, ${idx}`} className="w-[420px] mobile:w-[85%] micro:w-[92%] basis-auto pt-5">
                                <div className='w-full'>
                                    <div className='w-full border-[4px] border-black rounded-xl relative'>
                                        <div className='rounded-xl absolute top-2 -right-2 w-full h-full bg-black content-[""]'></div>
                                        <div className='w-full overflow-hidden rounded-xl flex justify-center items-center flex-col px-3 pt-5 pb-3 relative z-[2] bg-[#F2F2F2]'>
                                            <div className='w-full flex items-center gap-x-3'>
                                                <div className='flex justify-center items-center mb-2'>
                                                    <img src={i.reviewedBy.image || '/alt.png'} className='size-16 object-cover rounded-full' />
                                                </div>
                                                <div className='text-[13px]'>
                                                    <div className='text-[17px] font-semibold'>{i.reviewedBy.username}</div>
                                                    <div className='w-full overflow-hidden text-ellipsis'>{i.reviewedBy.email}</div>
                                                </div>
                                            </div>
                                            <div className='w-full'>
                                                <Rating
                                                    name="read-only"
                                                    value={Number(i.stars)}
                                                    readOnly
                                                />
                                            </div>
                                            <p className='text-[13px] h-20 micro:h-32 text-ellipsis overflow-hidden pl-1'>{i.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        }
        <ReviewBlog refetch={refetch} />
        <TopBlogWriting />
    </div>
  )
}

export default memo(BlogPage)