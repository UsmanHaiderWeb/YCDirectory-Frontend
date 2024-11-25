import { useMutation } from '@tanstack/react-query'
import React, { memo, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Params, useParams } from 'react-router-dom';
import { unlikeThisBlog } from './api/AxiosCalls';
import { useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreType } from './ReduxStore/Store';
import { myDataActions } from './ReduxStore/ReduxSlices/MyDataSlice';
import { BlogInterface } from './api/GraphqlCalls';
import ShowToast from './helpers/ShowToast';

const Unlike = ({blogId}: {blogId: string}) => {
  const param = useParams<Params>();
  const [ cookie ] = useCookies();
  const {isLoaded, isSignedIn, user} = useUser();
  const myData = useSelector((state: StoreType) => state.myDataSlice);
  const dispatch = useDispatch<AppDispatch>();

  const unlikeMutation = useMutation({
    mutationKey: ['unlikeBlog', blogId],
    mutationFn: unlikeThisBlog,
    onSuccess: (data) => {
      dispatch(myDataActions.removeLikedBlog(data.unlikedBlogId));
      ShowToast('This blog has been removed from your liked ones.', 'success');
    },
    onError: () => ShowToast('Failed to unlike this blog, please check your internet connection.', 'error'),
  });

  const like = () => {
      if (!isLoaded && !isSignedIn) return ShowToast('Please login to perform actions.', 'warn');
      unlikeMutation.mutate({clerkID: user.id, blogID: blogId, token: cookie.myOwntoken})
  }


  return (
    <button  className='w-full rounded-[50px] py-2 px-5 text-[12px] text-black hover:text-white hover:bg-black border-[4px] border-black border-solid duration-200 font-["codePro"] font-semibold' onClick={() => like()}>{unlikeMutation.isPending ? 'Processing...' : 'UnLike'}</button>
  )
}

export default memo(Unlike)