import React, { memo } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Rating } from '@mui/material'
import { reviewType } from './api/GraphqlCalls'

const Testimonials = ({data}: {data: [reviewType]}) => {
  return (
    <div>
        {data.length > 0 &&
            <div className='w-full overflow-hidden mt-10'>
                <h1 className='my-5 text-[40px] mobile:text-[30px] mobile:leading-[35px] micro:text-[30px] micro:leading-[35px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3'>Testimonials</h1>
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 3000,
                        }),
                    ]}
                >
                    <CarouselContent className={`gap-5 ${(data.length > 3) ? 'justify-start' : 'justify-center micro:justify-start mobile:justify-start mini:justify-start'}`}>
                        {data.map((i: reviewType, idx: number) => (
                            <CarouselItem key={`${i}, ${idx}`} className="w-[320px] mobile:w-[300px] micro:w-[90vw] basis-auto pt-5">
                                <div className='w-full'>
                                    <div className='w-full border-[4px] border-black rounded-xl relative'>
                                        <div className='rounded-xl absolute top-2 -right-2 w-full h-full bg-black content-[""]'></div>
                                        <div className='w-full overflow-hidden rounded-xl flex justify-center items-center flex-col px-3 py-5 relative z-[2] bg-[#F2F2F2]'>
                                            <div className='w-full gap-x-3'>
                                                <div className='flex justify-center items-center mb-2'>
                                                    <img src={i.reviewedBy.image || '/alt.png'} className='size-24 mobile:size-20 micro:size-16 object-cover rounded-full' />
                                                </div>
                                                <div className='text-[13px]'>
                                                    <div className='text-[17px] font-semibold text-center'>{i.reviewedBy.username}</div>
                                                    <div className='w-full overflow-hidden text-ellipsis text-center'>{i.reviewedBy.email}</div>
                                                </div>
                                            </div>
                                            <div className='w-full flex justify-center my-2'>
                                                <Rating
                                                    name="read-only"
                                                    value={Number(i.stars)}
                                                    readOnly
                                                    size='large'
                                                />
                                            </div>
                                            <p className='text-[13px] h-28 text-ellipsis overflow-hidden pl-1 text-center'>{i.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        }
    </div>
  )
}

export default memo(Testimonials)