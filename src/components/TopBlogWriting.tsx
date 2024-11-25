import React, { memo, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import BlogCardTemplate from './BlogCardTemplate'
import { BlogInterface } from './api/GraphqlCalls'
import { useSelector } from 'react-redux'
import { StoreType } from './ReduxStore/Store'

const TopBlogWriting = () => {
    const TopBlogs = useSelector((state: StoreType) => state.topBlogSlice);
    
    if(TopBlogs.length == 0){
        return null
    }

  return (
    <div className='w-full my-10'>
        <h1 className='my-5 text-[30px] mobile:text-[25px] mobile:leading-[30px] micro:text-[25px] micro:leading-[30px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3'>Top Blog Writings</h1>
        <Carousel
            plugins={[
                Autoplay({
                delay: 2000,
                }),
            ]}
        >
            <CarouselContent className='gap-5'>
                {TopBlogs.map((i: BlogInterface, idx: number) => (
                    <CarouselItem key={`${i}, ${idx}`} className="w-[280px] micro:w-[85%] basis-auto pt-5">
                        <div>
                            <BlogCardTemplate key={`${i}, ${idx}`} BlogData={i} isToBeResponsive={false} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    </div>
  )
}

export default memo(TopBlogWriting)