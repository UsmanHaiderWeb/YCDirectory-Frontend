import React, { memo, useEffect, useState } from 'react'
import CreatorSkeleton from './CreatorSkeleton'
import BlogCardTemplate from './BlogCardTemplate'
import { BlogInterface } from './api/GraphqlCalls'
import { useSelector } from 'react-redux'
import { StoreType } from './ReduxStore/Store'
import { Edit } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { Params, useNavigate, useParams } from 'react-router-dom'
import LoaderSpinner from './LoaderSpinner'

const DashBoard = () => {
  const [BlogsCategory, setBlogsCategory] = useState<string>('created');
  const [isEditable, setEditState] = useState<boolean>(false);
  const myData = useSelector((state: StoreType) => state.myDataSlice);
  const {user, isLoaded, isSignedIn} = useUser();
  const navigate = useNavigate();
  const param = useParams<Params>();

  useEffect(() => {
    if(isLoaded && !isSignedIn) navigate('/', {replace: true})
  }, [isLoaded])

  useEffect(() => {
    if(myData && myData?.username && isLoaded && isSignedIn){
      myData.username !== param.name && navigate('/page/not-found', { replace: true });
    }
  }, [myData, isLoaded]);


  if (!myData) {
    return (
      <div className='bg-[#F2F2F2] z-10 justify-center items-center flex w-full h-[80vh]'>
        <LoaderSpinner />
      </div>
    )
  }

  console.log("myData: ", myData);
  
  return (
    <div className='w-full'>
        <div className='w-full my-10 flex justify-center items-center gap-x-28'>
          <div className='hidden sm:block'>
            <div>
              <img src="/inspiration.svg" alt="creator-profile-photo" width='250' />
            </div>
            <div>
              <h3 className='text-center text-[25px] font-semibold'>{myData.username}</h3>
              <h3 className='text-center text-[17px] font-normal'>Your account</h3>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <CreatorSkeleton blogs={myData.blogs} idx={0} _id={myData._id} email={myData.email} image={myData.image} username={myData.username} recommendedBy={myData.recommendedBy} isPaidUser={myData.isPaidUser} isUser={true} />
          </div>
        </div>
        <div>
            <div className='flex justify-center items-center w-full gap-x-3 px-3 mini:flex-wrap mobile:flex-wrap micro:flex-wrap gap-y-2'>
                <div className='w-60 mini:w-[48%] mobile:w-[48%] micro:w-[45%] gap-y-2 h-20 rounded-xl border-[4px] border-black relative z-[1] after:absolute after:w-full after:h-full after:rounded-[10px] after:content-[""] after:bg-[black] after:top-2 after:-right-2 after:z-[-1]'>
                  <div className={`w-full h-full rounded-xl ${BlogsCategory == 'created' ? 'bg-[#dadada]' : 'bg-white'} flex justify-center items-center flex-col`} 
                    onClick={() => {
                      setBlogsCategory('created')
                      BlogsCategory != 'created' && setEditState(false)
                    }}>
                    <div className='sm:text-[20px] lgtab:text-[20px] tablet:text-[18px]'>Created <span className='micro:hidden'>Blogs</span></div>
                    <div className='text-[13px] opacity-70'>total: {myData.blogs.length}</div>
                  </div>
                </div>
                <div className='w-60 mini:w-[48%] mobile:w-[48%] micro:w-[45%] h-20 rounded-xl border-[4px] border-black relative z-[1] after:absolute after:w-full after:h-full after:rounded-[10px] after:content-[""] after:bg-[black] after:top-2 after:-right-2 after:z-[-1]'>
                  <div className={`w-full h-full rounded-xl ${BlogsCategory == 'liked' ? 'bg-[#dadada]' : 'bg-white'} flex justify-center items-center flex-col`}
                    onClick={() => {
                      setBlogsCategory('liked')
                      BlogsCategory != 'liked' && setEditState(false)
                    }}>
                    <div className='sm:text-[20px] lgtab:text-[20px] tablet:text-[18px]'>Liked <span className='micro:hidden'>Blogs</span></div>
                    <div className='text-[13px] opacity-70'>total: {myData.likedBlogs.length}</div>
                  </div>
                </div>
                <div className='w-60 micro:w-2/3 h-20 rounded-xl border-[4px] border-black relative z-[1] after:absolute after:w-full after:h-full after:rounded-[10px] after:content-[""] after:bg-[black] after:top-2 after:-right-2 after:z-[-1]'>
              <div className={`w-full h-full rounded-xl ${BlogsCategory == 'saved' ? 'bg-[#dadada]' : 'bg-white'} flex justify-center items-center flex-col`}
              onClick={() => {
                setBlogsCategory('saved')
                BlogsCategory != 'saved' && setEditState(false)
              }}>
                <div className='sm:text-[20px] lgtab:text-[20px] tablet:text-[18px]'>Saved <span className='micro:hidden'>Blogs</span></div>
                <div className='text-[13px] opacity-70'>total: {myData.savedBlogs.length}</div>
              </div>
              </div>
            </div>
            <div>
              {((BlogsCategory == 'saved' && myData.savedBlogs.length > 0) || (BlogsCategory == 'liked' && myData.likedBlogs.length > 0)) &&
                <div className='w-full text-right pr-16 flex justify-end'><span className='flex justify-end items-center gap-x-1 border-b-[1px] border-black border-solid cursor-pointer mt-5'
              onClick={() => setEditState((prev) => !prev)}
                >{isEditable ? 'Cancel' : 'Edit'} <Edit size={18} /></span></div>
              }
            </div>
            <div className='px-3'>
              <div className='flex justify-center items-center gap-x-5 gap-y-5 flex-wrap w-full mt-5'>
                {(BlogsCategory == 'created' ? myData.blogs : (BlogsCategory == 'liked' ? myData.likedBlogs : myData.savedBlogs)).map((i: BlogInterface, idx: number) => (
                  <BlogCardTemplate BlogData={i} key={`${i}, ${idx}`} isEditable={isEditable} unLike={BlogsCategory == 'liked' ? true : false} unsave={BlogsCategory == 'saved' ? true : false} />
                ))}
              </div>
              {(BlogsCategory == 'created' && myData.blogs.length == 0) &&
                <div className='text-[25px] font-semibold opacity-70 text-center mt-5'>You haven't created any blog yet</div>
              }
              {(BlogsCategory == 'liked' && myData.likedBlogs.length == 0) &&
                <div className='text-[25px] font-semibold opacity-70 text-center mt-5'>You haven't liked any blog yet</div>
              }
              {(BlogsCategory == 'saved' && myData.savedBlogs.length == 0) &&
                <div className='text-[25px] font-semibold opacity-70 text-center mt-5'>You haven't saved any blog yet</div>
              }
            </div>
        </div>
    </div>
  )
}

export default memo(DashBoard)