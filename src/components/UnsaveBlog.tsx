import { useMutation } from '@tanstack/react-query'
import React, { memo, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Params, useParams } from 'react-router-dom';
import { unsaveThisBlog } from './api/AxiosCalls';
import { useUser } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './ReduxStore/Store';
import { myDataActions } from './ReduxStore/ReduxSlices/MyDataSlice';
import ShowToast from './helpers/ShowToast';

const SaveBlog = ({blogId}: {blogId: string}) => {
  const [ cookie ] = useCookies();
  const {isLoaded, isSignedIn, user} = useUser();
  const dispatch = useDispatch<AppDispatch>();

  const unsaveMutation = useMutation({
    mutationKey: ['saveBlog', blogId],
    mutationFn: unsaveThisBlog,
    onSuccess: (data) => {
      dispatch(myDataActions.removeSavedBlog(data.unSavedBlogId));
      ShowToast('This blog has been removed from your saved ones.', 'success');
    },
    onError: () => ShowToast('Failed to remove this blog, please check your internet connection.', 'error'),
  });

  const unsaveBlogFunc = () => {
      if (!isLoaded && !isSignedIn) return ShowToast('Please login to perform actions.', 'warn');
      unsaveMutation.mutate({clerkID: user.id, blogID: blogId, token: cookie.myOwntoken})
  }

  return (<>
    <button  className='w-full rounded-[50px] py-2 px-5 text-[12px] text-black hover:text-white hover:bg-black border-[4px] border-black border-solid duration-200 font-["codePro"] font-semibold' onClick={() => unsaveBlogFunc()}>{unsaveMutation.isPending ? 'Processing...' : 'UnSave'}</button>
  </>)
}

export default memo(SaveBlog)