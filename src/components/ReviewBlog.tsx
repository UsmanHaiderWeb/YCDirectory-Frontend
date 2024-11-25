import React, { memo, useState } from 'react'
import RateBlog from './RateBlog'
import { useForm } from 'react-hook-form';
import ShowError from './ShowError';
import { api } from './api/AxiosCalls';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import ShowToast from './helpers/ShowToast';
import { useUser } from '@clerk/clerk-react';

const ReviewBlog = ({refetch}: {refetch: any}) => {
  const [cookie] = useCookies(['myOwntoken'])
  const param = useParams();

  const [ value, setValue ] = useState<number>(0);
  const [ StarValueError, setStarValueError ] = useState<string>('');

  const { register, handleSubmit, formState: {errors, isSubmitting}, reset } = useForm<{content: string}>();
  const {user, isLoaded, isSignedIn} = useUser();

  const sendReview = async (data: {content: string}) => {
    if (!isLoaded && !isSignedIn) return ShowToast('Please login to review blogs.', 'warn');
    if(!value){
      ShowToast('Please rate this blog.', 'warn');
      return setStarValueError('Please rate this blog.');
    } else setStarValueError('');
    try {
      let response = await api.post(`/blog/review?token=${cookie.myOwntoken}&id=${param.id}&clerkId=${user?.id}`, {...data, stars: value})
      console.log(response);
      if(response){
        await refetch();
        reset();
        setValue(0);
        ShowToast('Your review has been added.', 'success');
      }
    } catch (error) {
      console.log("REVIEW THE BLOG ERROR: ", error.message);
      ShowToast('Failed to review this blog, please check your internet connection.', 'error');
    }
  }

  return (
    <form onSubmit={handleSubmit(sendReview)} className='w-full mt-10'>
        <h1 className='my-5 text-[40px] mobile:text-[30px] mobile:leading-[35px] micro:text-[30px] micro:leading-[35px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3'>Enter your review</h1>
        <div className='px-14 mini:px-6 mobile:px-4 micro:px-3'>
          <div className='w-full rounded-2xl px-3 py-2 border-[2px] border-black mb-1'>
            <input type="text" className='bg-transparent w-full text-[14px] placeholder:text-[#111111dd] outline-none border-none' placeholder='Your name / Username (Optional)' />
          </div>
          <div className='w-full rounded-2xl px-3 py-2 border-[2px] border-black'>
              <textarea {...register('content', {required: 'This field is required.'})} className='bg-transparent w-full text-[14px] placeholder:text-[#111111dd] outline-none border-none h-40 resize-none' maxLength={200} placeholder='Please review this blog'></textarea>
              <ShowError message={errors.content?.message} />
          </div>
          <div className='w-full flex justify-between items-center micro:items-start micro:flex-col mt-2'>
            <div>
              <RateBlog value={value} setValue={setValue} />
            </div>
            <input type="submit" className='px-5 py-2 text-[15px] bg-[#e40606] text-white rounded-xl micro:self-end' value={isSubmitting ? 'Processing' : 'Send Review'} />
          </div>
          {StarValueError &&
            <ShowError message={StarValueError} />
          }
        </div>
    </form>
  )
}

export default memo(ReviewBlog)