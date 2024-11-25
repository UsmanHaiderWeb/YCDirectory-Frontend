import React, { memo } from 'react'
import FeedbackForm from './FeedbackForm'
import Testimonials from './Testimonials'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { reviewType, TestimonialsQuery } from './api/GraphqlCalls'
import { useSelector } from 'react-redux'
import { StoreType } from './ReduxStore/Store'

const FeedBackTestimonials = () => {
const shouldFetchAppDataSlice = useSelector((state: StoreType) => state.shouldFetchAppDataSlice);

    const { data, refetch, isPending, isError }: any = useQuery({
        queryKey: ['testimaonials'],
        queryFn: () => request('https://ycdirectory-backend.vercel.app/graphql', TestimonialsQuery),
        staleTime: 10000,
        enabled: shouldFetchAppDataSlice
    })

return (
    <div className='mb-10'>
        {(!isPending && !isError) && 
            <div>
                <Testimonials data={data.appReviews} />
            </div>
        }
        <div>
            <FeedbackForm refetch={refetch} />
        </div>
    </div>
    )
}

export default memo(FeedBackTestimonials)