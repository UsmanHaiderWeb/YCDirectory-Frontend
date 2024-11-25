import React, { memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod'
import ShowError from './ShowError'
import { api } from './api/AxiosCalls'
import { useUser } from '@clerk/clerk-react'
import { useCookies } from 'react-cookie'
import { AxiosResponse } from 'axios'
import ShowToast from './helpers/ShowToast'

export interface createBlogInter {
  title: string,
  description: string,
  categories: string,
  tags: string,
  image: MediaImage,
}


const CreateBlogPage = () => {
  const [ cookie ] = useCookies(['myOwnToken']);
  const { user, isLoaded, isSignedIn } = useUser()
  const [Image, setImage] = useState<any>(null);
  const [imageError, setImageError] = useState<string>('');

  const createBlogSchema = z.object({
    title: z.string().min(1, 'This is required field.'),
    description: z.string().min(1, 'This is required field.'),
    tags: z.string().min(1, 'This is required field.'),
    categories: z.string().min(1, 'This is required field.'),
  })


  const {register, handleSubmit, formState: {errors, isSubmitting}, setError, reset} = useForm<createBlogInter>({
    resolver: zodResolver(createBlogSchema)
  })

  const imageSelected = (e: any) => {
    if (e.target.files[0].type.includes('image/')) {
      console.log("e.target.files[0].size <  1048576:", e.target.files[0].size <  1048576);
      console.log("e.target.files[0].size <  1048576:", e.target.files[0].size);
      if (!(e.target.files[0].size < 1048576)) {
        ShowToast('Image should be less than 1MB in size.', 'warn');
        return setImageError('Image should be less than 1MB in size.');
      }
      setImage(e.target.files[0]);
      setImageError('');
    } else {
      setImageError('Only images are allowed.');
      ShowToast('Only images are allowed.', 'warn');
    }
  }

  const createBlogFunc = async (data: createBlogInter) => {
    if (!Image) {
      ShowToast('Please choose an image.', 'error');
      return setImageError('Please choose an image.');
    }
    if (!isLoaded || !isSignedIn) {
      return ShowToast('Please login first to create a blog.', 'error');
    }
    try {
      let formdata = new FormData();
      formdata.append('title', data.title);
      formdata.append('categories', data.categories);
      formdata.append('description', data.description);
      formdata.append('tags', data.tags);
      formdata.append('image', Image);
      
      let response: AxiosResponse = await api.post(`/blog/create?clerkId=${user.id}&token=${cookie.myOwntoken}`, formdata);
      if (response.data) {
        ShowToast('Blog has been successfully created', 'success');
        reset();
      }
    } catch (error: any) {
      console.log('CREATING ERROR: ', error?.message);
      ShowToast('Please check your internet connection, and try again.', 'error');
    }
  }

  return (
    <div>
      <div className="py-8 flex justify-center items-center flex-col mt-5 sm:mx-16 tablet:mx-0 mini:mx-0 mobile:mx-0 micro:mx-0 bg-[#dadada]">
        <h3 className=" pb-[5px] w-full text-center">Welcome to YCDirectory</h3>
        <h1 className="md:w-[700px] sm:w-[500px] lgtab:w-[500px] tablet:w-[500px] mini:w-[90vw] mobile:w-[95vw] micro:w-[97vw] text-center lg:text-[2.5vw] sm:text-[31px] lgtab:text-[31px] tablet:text-[31px] mini:text-[30px] mobile:text-[28px] micro:text-[30px] lg:leading-[3vw] sm:leading-[36px] lgtab:leading-[36px] tablet:leading-[36px] mini:leading-[35px] mobile:leading-[32px] micro:leading-[30px] font-semibold micro:px-2">
            Craft a blog that can ignite <span className="text-[#DC2626]">inspiration <img src="/inspiration.svg" className="w-[40px] inline-block" /></span>, <span className="text-[#DC2626]">knowledge <img src="/know.svg" className="w-[40px] inline-block" /></span>, and <span className="text-[#DC2626]">entertainment <img src="/entertainment.svg" className="w-[40px] inline-block"/></span>
        </h1>
      </div>
      <form onSubmit={handleSubmit(createBlogFunc)} className='w-[500px] mini:w-[90vw] mobile:w-[94vw] micro:w-[90vw] mx-auto flex justify-center items-center flex-col py-10'>
        <div className='mb-4 w-full'>
          <h4>Blog Title</h4>
          <div className='w-full rounded-[50px] px-5 py-2 border-[2px] border-black mt-1'>
            <input type="text" {...register('title')} className='bg-transparent w-full text-[14px] placeholder:text-[#111111dd] outline-none border-none' placeholder='Blog Title' />
          </div>
          <ShowError message={errors?.title?.message} />
        </div>
        <div className='mb-4 w-full'>
          <h4>Description</h4>
          <div className='w-full rounded-2xl px-3 py-2 border-[2px] border-black mt-1'>
            <textarea {...register('description')} className='bg-transparent w-full text-[14px] placeholder:text-[#111111dd] outline-none border-none h-40 resize-none' placeholder='Description'></textarea>
          </div>
          <ShowError message={errors?.description?.message} />
        </div>
        <div className='mb-4 w-full'>
          <h4>Select Image (Recommended 16:9)</h4>
          <div className='w-full rounded-[50px] px-5 py-2 border-[2px] border-black mt-1'>
            <input type="file" className='bg-transparent w-full text-[14px] placeholder:text-[#111111dd] outline-none border-none' placeholder='Blog Title' onChange={imageSelected} />
          </div>
          <ShowError message={imageError} />
        </div>
        <div className='mb-4 w-full'>
          <h4>Categories</h4>
          <div className='w-full rounded-[50px] px-5 py-2 border-[2px] border-black mt-1'>
            <input type="text" {...register('categories')} className='bg-transparent w-full text-[14px] placeholder:text-[#111111dd] outline-none border-none' placeholder='Categories e.g., food bread chef etc.' />
          </div>
          <ShowError message={errors?.categories?.message} />
        </div>
        <div className='mb-4 w-full'>
          <h4>Tags</h4>
          <div className='w-full rounded-[50px] px-5 py-2 border-[2px] border-black mt-1'>
            <input type="text" {...register('tags')} className='bg-transparent w-full text-[14px] placeholder:text-[#111111dd] outline-none border-none' placeholder='tags e.g., #food #bread #chef etc.' />
          </div>
          <ShowError message={errors?.tags?.message} />
        </div>
        {isSubmitting ?
          <div className='w-full rounded-[50px] px-5 py-3 mt-1 bg-[#e40606] text-white text-[14px] opacity-80 text-center'>Processing</div>
        :
          <input type="submit" className='w-full rounded-[50px] px-5 py-3 mt-1 bg-[#e40606] text-white text-[14px]' value='Create' />
        }
      </form>
      {/* <UpgradePlan /> */}
    </div>
  )
}

export default memo(CreateBlogPage)

/*

Hirrd | Get Hired Now

Hirrd is a free job portal web application. It offers a lot of services that are mind blowing. We offer you complete convenience. User can register as a candidate, who is there is seek jobs, or as a recruiter, who is there to recruit such candidates that prove beneficial for their company.
Hirrd is a free job portal web application. It offers a lot of services that are mind blowing. We offer you complete convenience. User can register as a candidate, who is there is seek jobs, or as a recruiter, who is there to recruit such candidates that prove beneficial for their company. If user is a candidate, he can save a job, apply for a job, and can view the growth of his applications that he submitted.
But if he is a recruiter, he can create a job, and handle the applications (cancel or accept) that are submitted for the job hiring.

Job, Job seeking, job hiring, internship, startup, tech jobs, web jobs, frontend jobs, backend jobs, developer jobs

#job #job seeking #job hiring #internship #startup #tech jobs #web jobs #frontend jobs #backend jobs #developer jobs

*/