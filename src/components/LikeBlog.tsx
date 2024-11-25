import { useMutation } from '@tanstack/react-query'
import React, { memo, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Params, useParams } from 'react-router-dom';
import { likeThisBlog } from './api/AxiosCalls';
import { useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreType } from './ReduxStore/Store';
import { myDataActions } from './ReduxStore/ReduxSlices/MyDataSlice';
import { BlogInterface } from './api/GraphqlCalls';
import ShowToast from './helpers/ShowToast';

const LikeBlog = () => {
  const [isBlogExist, setLikedBlog] = useState<boolean>(false);
  const param = useParams<Params>();
  const [ cookie ] = useCookies();
  const {isLoaded, isSignedIn, user} = useUser();
  const myData = useSelector((state: StoreType) => state.myDataSlice);
  const dispatch = useDispatch<AppDispatch>();

  const likeMutation = useMutation({
    mutationKey: ['likeBlog', param.id],
    mutationFn: likeThisBlog,
    onSuccess: (data) => {
      dispatch(myDataActions.addLikedBlogs(data.likedBlog));
      ShowToast('This blog has been added to your liked ones.', 'success');
    },
    onError: () => ShowToast('Failed to like this blog, please check your internet connectivity.', 'error'),
  });

  const like = () => {
      if (!isLoaded || !isSignedIn) return ShowToast('Please login to like blogs.', 'warn');
      likeMutation.mutate({clerkID: user.id, blogID: param.id, token: cookie.myOwntoken})
  }

  useEffect(() => {
    if (myData) {
      myData.likedBlogs.forEach((blog: BlogInterface) => {
        if (blog._id == param.id) {
          setLikedBlog(true);
        }
      })
    }
  } , [myData, myData?.likedBlogs])

  return (<>
    {isBlogExist ?
      <button className="text-[14px] micro:text-[13px] px-7 py-3 rounded-3xl bg-black text-white" onClick={() => ShowToast('You have already liked this blog.', 'info')}>Liked</button>
      :
      <button className="text-[14px] micro:text-[13px] px-7 py-3 rounded-3xl bg-[#dadada] hover:bg-gray-300" onClick={() => like()}>{likeMutation.isPending ? 'Requesting...' : 'Like this Blog'}</button>
    }
  </>)
}

export default memo(LikeBlog)