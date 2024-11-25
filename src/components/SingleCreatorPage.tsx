import React, { memo, useEffect } from 'react'
import CreatorSkeleton from './CreatorSkeleton'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import BlogCardTemplate from './BlogCardTemplate'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { BlogInterface, SingleCreator } from './api/GraphqlCalls'
import TopBlogWriting from './TopBlogWriting'
import LoaderSpinner from './LoaderSpinner'
import { useSelector } from 'react-redux'
import { StoreType } from './ReduxStore/Store'

const SingleCreatorPage = () => {
    const param = useParams()
    const shouldFetchAppDataSlice = useSelector((state: StoreType) => state.shouldFetchAppDataSlice);

    const { data, isPending, isError, error } : any = useQuery({
        queryKey: ['singleCreator', param.id],
        queryFn: () => request('https://ycdirectory-backend.vercel.app/graphql', SingleCreator, {id: param.id}),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: shouldFetchAppDataSlice
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
    <div>
        <div className='w-full h-full mt-5'>
            <div className='mb-10 flex justify-center items-center gap-x-28'>
                <div className='hidden sm:block'>
                    <div>
                        <img src="/inspiration.svg" alt="creator-profile-photo" width='250' />
                    </div>
                    <div>
                        <h3 className='text-center text-[25px] font-semibold'>{data.getSingleUser.username}</h3>
                        <h5 className='text-center text-[17px] font-normal'>Creators Profile</h5>
                    </div>
                </div>
                <CreatorSkeleton blogs={data.getSingleUser.blogs} idx={0} key={0} _id={data.getSingleUser._id} email={data.getSingleUser.email} image={data.getSingleUser.image} username={data.getSingleUser.username} recommendedBy={data.getSingleUser.recommendedBy} isPaidUser={data.getSingleUser.isPaidUser} likeProfile={true} />
            </div>
            {data.getSingleUser.blogs.length != 0 &&
                <h1 className='my-5 text-[40px] mobile:text-[30px] mobile:leading-[35px] micro:text-[30px] micro:leading-[35px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3 text-center'>Created Blogs</h1>
            }
            <div className='px-3'>
                <div className='flex justify-center items-center gap-x-5 gap-y-5 flex-wrap'>
                    {data.getSingleUser.blogs.map((i: BlogInterface, idx: number) => (
                        <BlogCardTemplate key={`${i}, ${idx}`} BlogData={i}  />
                    ))}
                </div>
                
            </div>
        </div>
        <TopBlogWriting />
    </div>
  )
}

export default memo(SingleCreatorPage)