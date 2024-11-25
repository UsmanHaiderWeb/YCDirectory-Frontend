import React, { memo } from 'react'
import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { likeThisCreator, unlikeThisCreator } from './api/AxiosCalls';
import { useUser } from '@clerk/clerk-react';
import { AppDispatch, StoreType } from './ReduxStore/Store';
import { myDataActions } from './ReduxStore/ReduxSlices/MyDataSlice';
import ShowToast from './helpers/ShowToast';

const LikeCreator = () => {
  const myData = useSelector((state: StoreType) => state.myDataSlice);
  const param = useParams();
  const {isLoaded, isSignedIn, user} = useUser();
  const [ cookie ] = useCookies();
  const dispatch = useDispatch<AppDispatch>();

  const likeCreatorMutation = useMutation({
    mutationKey: ['likeCreator', param.id],
    mutationFn: likeThisCreator,
    onSuccess: (data) => {
      dispatch(myDataActions.addLikedCreatos({_id: data.likedCreator._id}));
      ShowToast('Your have liked this creator for his impressive working.', 'success');
    },
    onError: () => ShowToast('Failed to like this creator, please check your internet connectivity.', 'error'),
  });

  const likeCreatorFn = async () => {
    if (!isLoaded || !isSignedIn) return ShowToast('Please login to like blogs.', 'warn');
    if (myData?._id == param.id) return ShowToast('You can like anyone, but other than yourself.', 'warn');
    likeCreatorMutation.mutate({clerkID: user.id, creatorID: param.id, token: cookie.myOwntoken})
  }


  const unlikeCreatorMutation = useMutation({
    mutationKey: ['unlikeCreator', param.id],
    mutationFn: unlikeThisCreator,
    onSuccess: (data) => {
      dispatch(myDataActions.removeLikedCreators(data.unlikedCreatorId));
      ShowToast('Your have unliked this creator for its work.', 'success');
    },
    onError: () => ShowToast('Failed to like this creators, please check your internet connectivity.', 'error'),
  });

  const unlikeCreatorFn = async () => {
    if (!isLoaded || !isSignedIn) return ShowToast('Please login to like blogs.', 'warn');
    unlikeCreatorMutation.mutate({clerkID: user.id, creatorID: param.id, token: cookie.myOwntoken})
  }
  
  return ( <>
    {myData?.likedCreators.some(user => user._id == param.id) ?
      <button className='text-white text-[14px] bg-black px-5 py-2 w-full mx-5 rounded-xl mt-5 mb-3 text-center border-black border-solid border-[4px]' onClick={() => !unlikeCreatorMutation.isPending && unlikeCreatorFn()}>{unlikeCreatorMutation.isPending ? 'Processing...' : 'UnLike'}</button>
    :
      <button className='bg-white text-[14px] text-black px-5 py-2 w-full mx-5 rounded-xl mt-5 mb-3 text-center border-black border-solid border-[4px]' onClick={() => !likeCreatorMutation.isPending && likeCreatorFn()}>{likeCreatorMutation.isPending ? 'Processing...' : 'Like this Creator'}</button>
    }
  </>)
}

export default memo(LikeCreator)