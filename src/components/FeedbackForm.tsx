import React, { memo, useState } from 'react'
import RateBlog from './RateBlog'
import { useForm } from 'react-hook-form';
import ShowError from './ShowError';
import { api } from './api/AxiosCalls';
import { useCookies } from 'react-cookie';
import { useUser } from '@clerk/clerk-react';
import ShowToast from './helpers/ShowToast'

const feedbackForm = ({refetch}: {refetch: any}) => {
  const [cookie] = useCookies(['myOwntoken'])

  const [ value, setValue ] = useState<number>(0);
  const [ StarValueError, setStarValueError ] = useState<string>('');

  const { register, handleSubmit, formState: {errors, isSubmitting}, reset } = useForm<{content: string, username?: string, email?: string}>();
  const {user, isLoaded, isSignedIn} = useUser();

  const sendReview = async (data: {content: string, username?: string, email?: string}) => {
    if (!isLoaded && !isSignedIn) return;
    if(!value){
      ShowToast('Please rate our services.', 'warn');
      return setStarValueError('Please rate our services.');
    } else setStarValueError('');
    try {
      let response = await api.post(`/app/review?token=${cookie.myOwntoken}&clerkId=${user?.id}`, {content: data.content, stars: value})
      console.log(response);
      if(response){
        await refetch();
        reset();
        setValue(0);
        ShowToast('Your feedback has been added.', 'success');
      }
    } catch (error) {
      console.log("REVIEW THE APP ERROR: ", error.message);
      if(isLoaded && !isSignedIn){
        setStarValueError('Please sign in to leave a review.');
        ShowToast('Please login to leave your feedback.', 'warn');
      } else ShowToast('Please check your internet connection.', 'error');
    }
  }

  return (
    <form onSubmit={handleSubmit(sendReview)} className='w-full mt-10'>
        <h1 className='my-5 text-[40px] mobile:text-[30px] mobile:leading-[35px] micro:text-[30px] micro:leading-[35px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3'>Review our services</h1>
        <div className='px-20 tablet:px-10 mini:px-6 mobile:px-4 micro:px-3'>
          <div>
              <div className='w-full rounded-2xl px-3 py-2 border-[2px] border-black mb-1'>
                  <input type="text" {...register('username')} className='bg-transparent w-full text-[14px] placeholder:text-[#111111dd] outline-none border-none' placeholder='Your name / Username (Optional)' />
              </div>
              <div className='w-full rounded-2xl px-3 py-2 border-[2px] border-black mb-1'>
                  <input type="text" {...register('email')} className='bg-transparent w-full text-[14px] placeholder:text-[#111111dd] outline-none border-none' placeholder='Enter your email (Optional)' />
              </div>
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

export default memo(feedbackForm)