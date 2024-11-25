import React, { memo, useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { myData, TopBlogsQuery } from './api/GraphqlCalls'
import { useUser } from '@clerk/clerk-react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StoreType } from './ReduxStore/Store'
import { myDataActions } from './ReduxStore/ReduxSlices/MyDataSlice'
import Footer from './Footer'
import FeedBackTestimonials from './FeedBackTestimonials'
import { topBlogActions } from './ReduxStore/ReduxSlices/TopBlogSlice'

const ContentWrapper = () => {
  const { user, isLoaded, isSignedIn } = useUser();  
  const [ cookie ] = useCookies(['myOwntoken'])
  const dispatch = useDispatch<AppDispatch>();
  const shouldFetchAppDataSlice = useSelector((state: StoreType) => state.shouldFetchAppDataSlice);

  const { data, isPending, isError } : any = useQuery({
    queryKey: ['MY_Data', user?.id],
    queryFn: () => request('https://ycdirectory-backend.vercel.app/graphql', myData, {clerkId: user?.id}),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    enabled: shouldFetchAppDataSlice && !!user?.id,
  })

  console.log("MYDATA CONTENT WRAPPER: ", data);

  const tobBlogsQueryData: any = useQuery({
    queryKey: ['TopBlogs'],
    queryFn: () => request('https://ycdirectory-backend.vercel.app/graphql', TopBlogsQuery),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: shouldFetchAppDataSlice,
  })
  useEffect(() => {
    if(tobBlogsQueryData.data) dispatch(topBlogActions.update(tobBlogsQueryData.data.TopBlogs));
  }, [tobBlogsQueryData.data])


  useEffect(() => {
    if (cookie.myOwntoken && !isPending && !isError && data.me) {
      dispatch(myDataActions.updateMyData(data.me))
    }
  }, [data])

  return (
    <div className='overflow-hidden'>
      <Header />
      <main>
        <Outlet />
        <FeedBackTestimonials />
      </main>
      <Footer />
    </div>
  )
}

export default memo(ContentWrapper)