import { Heart } from 'lucide-react'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { UsersInterface } from './api/GraphqlCalls'
import { number } from 'zod'
import { StoreType } from "./ReduxStore/Store";
import { useSelector } from "react-redux";
import LikeCreator from './LikeCreator';

interface extendedCreatorInter extends UsersInterface {
  idx: number,
  likeProfile: boolean,
  isUser: boolean
}

const DefaultCreatoreValue: extendedCreatorInter = {
  likeProfile: false,
  isUser: false,
  idx: 0,
  _id: 'string;',
  email: 'string;',
  image: 'string;',
  username: 'string;',
  isPaidUser: false,
  recommendedBy: [{
    _id: ''
  }],
  blogs: [{
    _id: ''
  }],
  likedBlogs: [{
    _id: ''
  }],
  savedBlogs: [{
    _id: ''
  }],
}

const CreatorSkeleton = (i: extendedCreatorInter = DefaultCreatoreValue) => {
  const myData = useSelector((state: StoreType) => state.myDataSlice);

  return (
    <div className='w-[280px] border-[4px] border-black rounded-xl relative'>
        <div className='rounded-xl absolute top-2 -right-2 w-full h-full bg-black content-[""]'></div>
        <div className={`w-full rounded-lg flex justify-center items-center flex-col px-3 pt-5 pb-3 relative z-[2] ${i.idx % 6 == 0 ? 'bg-[#EE2B69]' : (i.idx % 6 == 1 ? 'bg-[#e40606]' : (i.idx % 6 == 2 ? 'bg-[#888]': (i.idx % 6 == 3 ? 'bg-[#222]' : (i.idx % 6 == 4 ? 'bg-[#8c56f7]' : (i.idx % 6 == 5 && 'bg-[darkcyan]')))))}`}>
            <h3 className='absolute top-0 -translate-y-1/2 after:absolute after:w-[101%] after:h-[155%] after:rounded-[10px] after:content-[""] after:bg-[black] after:-top-2 after:-right-1 after:z-[-1] after:-rotate-3'><span className='border-[4px] border-black bg-[#f7f7f7] w-full px-5 py-1 rounded-[10px]'>{i.username}</span></h3>
            <div>
              <h5 className='text-white mt-3 mb-2'>Recommended by: {i.recommendedBy.length}</h5>
            </div>
            <Link to={myData?._id == i._id ? `/${myData?.username}/dashboard` : `/creators/${i._id}`} onClick={() => window.scrollTo(0, 0)} className='rounded-full bg-[#f7f7f7] mb-5'>
                <img src={i.image || "/alt.png"} className='w-40 h-40 object-cover rounded-full'/>
            </Link>
            <div className='text-white  text-center'>Created {i.blogs.length} Blogs</div>
            <h4 className='text-center text-white text-[16px] w-[200px] text-ellipsis overflow-hidden'>{i.email}</h4>
            {i.likeProfile && 
              <LikeCreator />
            }
            {i.isUser && 
              <button className='text-white text-[14px] bg-black px-5 py-2.5 w-full mx-5 rounded-xl mt-5 mb-3 text-center'>Your account</button>
            }
            {(!i.likeProfile && !i.isUser) &&
              <Link to={myData?._id == i._id ? `/${myData?.username}/dashboard` : `/creators/${i._id}`} onClick={() => window.scrollTo(0, 0)} className='text-white text-[14px] bg-black px-5 py-2.5 w-full mx-5 rounded-xl mt-5 mb-3 text-center'>See Profile</Link>
            }
        </div>
    </div>
  )
}

export default memo(CreatorSkeleton)