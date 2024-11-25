import React, { Fragment, memo } from 'react'
import BlogCardTemplate from './BlogCardTemplate'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import { allBlogs, BlogInterface } from './api/GraphqlCalls'
import LoaderSpinner from './LoaderSpinner'
import { useSelector } from 'react-redux'
import { StoreType } from './ReduxStore/Store'


const ShowAllBlogsPaginated = ({whatToSearch, search}: {whatToSearch: string, search: boolean}) => {
    const shouldFetchAppDataSlice = useSelector((state: StoreType) => state.shouldFetchAppDataSlice);

    const {data, isPending, isError}: any = useQuery({
        queryKey: ['AllBlogs'],
        queryFn: async () => request('https://ycdirectory-backend.vercel.app/graphql', allBlogs),
        staleTime: 10000,
        refetchOnWindowFocus: false,
        enabled: shouldFetchAppDataSlice
    })

    if (isPending || isError) {
        return (
            <div className='bg-[#F2F2F2] z-10 justify-center items-center flex w-full h-[80vh]'>
                <LoaderSpinner />
            </div>
        )
    }

  return (
    <div className='pb-10'>
        <h1 className='my-5 text-[30px] mobile:text-[25px] mobile:leading-[30px] micro:text-[25px] micro:leading-[30px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3'>{whatToSearch == '/' ?'Recommended Blogs' : 'Related Blogs'}</h1>
        <div className='flex justify-center items-center gap-x-5 gap-y-5 flex-wrap w-full px-14 lgtab:px-2 tablet:px-2 mini:px-6 mobile:px-4 micro:px-3'>
            {data.allBlogs?.map((i: BlogInterface, idx: number) => (<Fragment  key={`${i}, ${idx}`}>
                {whatToSearch == '/' ?
                    <BlogCardTemplate BlogData={i} />
                :<>
                    {i.title.includes(whatToSearch) &&
                        <BlogCardTemplate BlogData={i} />
                    }
                </>}
            </Fragment>))}
        </div>
    </div>
  )
}

export default memo(ShowAllBlogsPaginated)