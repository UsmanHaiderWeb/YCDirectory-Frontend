import { Heart } from 'lucide-react'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { BlogInterface } from './api/GraphqlCalls'
import Unlike from './Unlike'
import UnsaveBlog from './UnsaveBlog'
import { createdAtFormatter } from './helpers/createdAt'
import { StoreType } from "./ReduxStore/Store";
import { useSelector } from "react-redux";


export const defaultBlogValue: BlogInterface = {
    _id: 'string',
    title: 'UsmanHaiderWeb',
    caption: 'I am a MERN fullstack developer',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta asperiores error et quisquam, eaque itaque tempore sapiente a, natus, vel eos dolores ratione cum corrupti maiores optio! Qui, debitis libero.',
    image: '/pin7.jpg',
    createdBy: {
        _id: 'string',
        username: 'Usman Haider',
        email: 'u969828@gmail.com',
        image: '/pin7.jpg',
    },
    likedBy: [{
        _id: 'string'
    }],
    reviews: [{
        _id: 'string'
    }],
    categories: 'Food, Chef, Dishes, Plates',
    createdAt: 'October 23, 2024',
    tags: 'Food, Chef, Dishes, Plates',
}

const BlogCardTemplate = ({BlogData = defaultBlogValue, isEditable, unLike, unsave, isToBeResponsive = true}: {BlogData?: BlogInterface, isEditable?: boolean, unLike?: boolean, unsave?: boolean, isToBeResponsive?: boolean}) => {
    const myData = useSelector((state: StoreType) => state.myDataSlice);

return (
    <div className={`w-[280px] ${isToBeResponsive ? 'micro:w-[95vw] mobile:w-[95vw] mini:w-[85%] tablet:w-[85%]' : 'micro:w-[85vw]'} border-[4px] border-black rounded-xl relative`}>
        <div className='rounded-xl absolute top-2 -right-2 w-full h-full bg-black content-[""]'></div>
        <div className='w-full overflow-hidden rounded-xl flex justify-center items-center flex-col px-3 pt-5 pb-3 relative z-[2] bg-[#F2F2F2]'>
            <div className='w-full flex justify-between items-center'>
                <div className='text-[13px]'>{createdAtFormatter(BlogData.createdAt)}</div>
                <div className='flex justify-between items-center text-[13px] gap-x-2'><Heart size={15} />{BlogData.likedBy?.length}</div>
            </div>
            <Link to={myData?._id == BlogData.createdBy._id ? `/${myData?.username}/dashboard` : `/creators/${BlogData.createdBy._id}`} className='w-full flex justify-between items-center my-3'>
                <div className='text-[13px]'>
                    <div className='w-48 overflow-hidden text-ellipsis'>{BlogData.createdBy.email}</div>
                    <div className='text-[16px] font-semibold'>{BlogData.createdBy.username}</div>
                </div>
                <div className='text-[13px]'><img src={BlogData.createdBy.image || '/alt.png'} className='size-10 object-cover rounded-full' /></div>
            </Link>
            <h3 className='w-full font-semibold text-[15px]'>{BlogData.title}</h3>
            <p className='h-10 text-ellipsis overflow-hidden text-[13px]'>{BlogData.description}</p>
            <Link to={`/blog/${BlogData._id}`} className='w-full rounded-xl overflow-hidden my-2'>
                <img src={BlogData.image} className={`w-full h-40 ${isToBeResponsive && 'mobile:h-48 mini:h-52 tablet:h-60'} object-cover`} />
            </Link>
            <div className='w-full flex justify-between items-center my-2'>
                <p className={`text-[13px] w-40 ${isToBeResponsive && 'mobile:w-[60vw] mini:w-[60vw] tablet:w-[60vw]'} overflow-hidden text-ellipsis whitespace-nowrap`}>{BlogData.categories}</p>
                <Link to={`/blog/${BlogData._id}`} className='bg-black rounded-[50px] py-2.5 px-5 text-[12px] text-white'>Details</Link>
            </div>
            {(isEditable && unLike) &&
                <Unlike blogId={BlogData._id} />
            }
            {(isEditable && unsave) &&
                <UnsaveBlog blogId={BlogData._id} />
            }
        </div>
    </div>
  )
}

export default memo(BlogCardTemplate)