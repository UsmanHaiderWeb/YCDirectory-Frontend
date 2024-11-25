import { useMutation } from '@tanstack/react-query'
import React, { memo, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Params, useParams } from 'react-router-dom';
import { saveThisBlog } from './api/AxiosCalls';
import { useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreType } from './ReduxStore/Store';
import { myDataActions } from './ReduxStore/ReduxSlices/MyDataSlice';
import { BlogInterface } from './api/GraphqlCalls';
import ShowToast from './helpers/ShowToast';

const SaveBlog = () => {
  const [isBlogExist, setSavedBlog] = useState<boolean>(false);
  const param = useParams<Params>();
  const [ cookie ] = useCookies();
  const {isLoaded, isSignedIn, user} = useUser();
  const myData = useSelector((state: StoreType) => state.myDataSlice);
  const dispatch = useDispatch<AppDispatch>();

  const saveMutation = useMutation({
    mutationKey: ['saveBlog', param.id],
    mutationFn: saveThisBlog,
    onSuccess: (data) => {
      dispatch(myDataActions.saveBlogs(data.savedBlog))
      ShowToast('This blog has been saved successfully.', 'success');
    },
    onError: () => ShowToast('Failed to save this blog, please try again later.', 'error'),
  });

  const saveBlogFunc = () => {
      if (!isLoaded || !isSignedIn) return ShowToast('Please login to save blogs.', 'warn');
      saveMutation.mutate({clerkID: user.id, blogID: param.id, token: cookie.myOwntoken})
  }

  useEffect(() => {
    if (myData) {
      myData.savedBlogs.forEach((blog: BlogInterface) => {
        if (blog._id == param.id) {
          setSavedBlog(true);
        }
      })
    }
  } , [myData, myData?.likedBlogs])

  return (<>
    {isBlogExist ?
      <button className="text-[14px] micro:text-[13px] px-7 py-3 rounded-3xl bg-black text-white" onClick={() => ShowToast('You have already saved this blog.', 'info')}>Saved</button>
      :
      <button className="text-[14px] micro:text-[13px] px-7 py-3 rounded-3xl bg-[#dadada] hover:bg-gray-300" onClick={() => saveBlogFunc()}>{saveMutation.isPending ? 'Saving' : 'Save Blog'}</button>
    }
  </>)
}

export default memo(SaveBlog)