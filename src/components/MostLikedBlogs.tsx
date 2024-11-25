import React, { memo } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"  
import CreatorSkeleton from './CreatorSkeleton'
import BlogCardTemplate from './BlogCardTemplate'
import { useSelector } from 'react-redux'
import { StoreType } from './ReduxStore/Store'
import { BlogInterface, TopCreators, UsersInterface } from './api/GraphqlCalls'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import LoaderSpinner from './LoaderSpinner'

const MostLikedBlogs = () => {
    const TopBlogs = useSelector((state: StoreType) => state.topBlogSlice);
    const shouldFetchAppDataSlice = useSelector((state: StoreType) => state.shouldFetchAppDataSlice);

    const { data, isPending, isError }: any = useQuery({
        queryKey: ['topCreators'],
        queryFn: async () => request('https://ycdirectory-backend.vercel.app/graphql', TopCreators),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: shouldFetchAppDataSlice
    })

  return (
    <div>
        <div className="py-8 flex justify-center items-center flex-col mt-5 mobile:mt-3 micro:mt-2 sm:mx-16 tablet:mx-0 mini:mx-0 mobile:mx-0 micro:mx-0 bg-[#dadada]">
            <h3 className="pb-[5px] w-full text-center">Welcome to YCDirectory</h3>
            <h1 className="md:w-[700px] sm:w-[500px] lgtab:w-[500px] tablet:w-[500px] mini:w-[90vw] mobile:w-[95vw] micro:w-[97vw] text-center lg:text-[2.5vw] sm:text-[31px] lgtab:text-[31px] tablet:text-[31px] mini:text-[30px] mobile:text-[28px] micro:text-[30px] lg:leading-[3vw] sm:leading-[36px] lgtab:leading-[36px] tablet:leading-[36px] mini:leading-[35px] mobile:leading-[32px] micro:leading-[34px] font-semibold micro:px-2">
            Blogs that ignite <span className="text-[#DC2626]">inspiration <img src="/inspiration.svg" className="w-[40px] inline-block" /></span>, <span className="text-[#DC2626]">knowledge <img src="/know.svg" className="w-[40px] inline-block" /></span>, and <span className="text-[#DC2626]">entertainment <img src="/entertainment.svg" className="w-[40px] inline-block"/></span> through their writing
            </h1>
        </div>
        {(isPending || isError) ?
            <div className='bg-[#F2F2F2] z-10 justify-center items-center flex w-full h-[80vh]'>
                <LoaderSpinner />
            </div>
        :<>
            <div className='my-10'>
                <h1 className='my-5 text-[30px] mobile:text-[25px] mobile:leading-[30px] micro:text-[25px] micro:leading-[30px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3'>Our Inspirational Blog Creators</h1>
                <Carousel
                    plugins={[
                        Autoplay({
                        delay: 2000,
                        }),
                    ]}
                >
                    <CarouselContent className='gap-5'>
                        {data.TopCreators.map((i: UsersInterface, idx: number) => (
                            <CarouselItem key={`${i}, ${idx}`} className="w-[280px] basis-auto pt-5">
                                <div>
                                    <CreatorSkeleton blogs={i.blogs} idx={idx} key={`${i}, ${idx}`} recommendedBy={i.recommendedBy} _id={i._id} email={i.email} image={i.image} username={i.username}  />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            {TopBlogs.length > 0 &&
                <div className='pb-10 pt-5'>
                    <h1 className='my-5 text-[30px] mobile:text-[25px] mobile:leading-[30px] micro:text-[25px] micro:leading-[30px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3'>Most Liked Blogs</h1>
                    <div className='flex justify-center items-center gap-x-5 gap-y-5 flex-wrap w-full  px-14 mini:px-6 mobile:px-4 micro:px-3'>
                        {TopBlogs.map((i: BlogInterface, idx: number) => (
                            <BlogCardTemplate key={`${i}, ${idx}`} BlogData={i} />
                        ))}
                    </div>
                </div>
            }
        </>}
    </div>
  )
}

export default memo(MostLikedBlogs)