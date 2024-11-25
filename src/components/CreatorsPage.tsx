import React, { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { allCreators, UsersInterface } from './api/GraphqlCalls'
import TopBlogWriting from './TopBlogWriting'
import SearchBlog from './SearchBlog'
import ShowCreatorsSection from './ShowCreatorsSection'
import LoaderSpinner from './LoaderSpinner'
import { useSelector } from 'react-redux'
import { StoreType } from './ReduxStore/Store'

const CreatorsPage = () => {
    const shouldFetchAppDataSlice = useSelector((state: StoreType) => state.shouldFetchAppDataSlice);

    const {isPending, isError, data, error}: any = useQuery({
        queryKey: ['AllCreators'],
        queryFn: () => request('https://ycdirectory-backend.vercel.app/graphql', allCreators),
        staleTime: 10000,
        refetchOnWindowFocus: false,
        enabled: shouldFetchAppDataSlice
    })

  return (
    <div>
        <div className="py-8 flex justify-center items-center flex-col mt-5 mobile:mt-3 micro:mt-2 sm:mx-16 tablet:mx-0 mini:mx-0 mobile:mx-0 micro:mx-0 bg-[#dadada]">
            <h3 className="pb-[5px] w-full text-center">Welcome to YCDirectory</h3>
            <h1 className="md:w-[700px] sm:w-[500px] lgtab:w-[500px] tablet:w-[500px] mini:w-[90vw] mobile:w-[95vw] micro:w-[97vw] text-center lg:text-[2.5vw] sm:text-[31px] lgtab:text-[31px] tablet:text-[31px] mini:text-[30px] mobile:text-[28px] micro:text-[30px] lg:leading-[3vw] sm:leading-[36px] lgtab:leading-[36px] tablet:leading-[36px] mini:leading-[35px] mobile:leading-[32px] micro:leading-[30px] font-semibold micro:px-2">
            Top Creators that ignite <span className="text-[#DC2626]">inspiration <img src="/inspiration.svg" className="w-[40px] inline-block" /></span>, <span className="text-[#DC2626]">knowledge <img src="/know.svg" className="w-[40px] inline-block" /></span>, and <span className="text-[#DC2626]">entertainment <img src="/entertainment.svg" className="w-[40px] inline-block"/></span> by their thoughts
            </h1>
        </div>
        {(isPending || isError) ?
            <div className='bg-[#F2F2F2] z-10 justify-center items-center flex w-full h-[80vh]'>
                <LoaderSpinner />
            </div>
        :<>
            <SearchBlog specificURl='/creators' searchOptions={data.getAllUsers.map((creator: UsersInterface) => creator.username)} placeholder='Search Creators' />
            <ShowCreatorsSection allCreators={data.getAllUsers} />
        </>}
        <TopBlogWriting />
    </div>
  )
}

export default memo(CreatorsPage)