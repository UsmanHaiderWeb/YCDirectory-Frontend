import React, { memo } from 'react'
import { UsersInterface } from './api/GraphqlCalls'
import CreatorSkeleton from './CreatorSkeleton'
import { useParams } from 'react-router-dom'


const ShowCreatorsSection = ({allCreators} : {allCreators: [UsersInterface]}) => {
    const param = useParams();

  return (
    <div className='pb-10'>
        <h1 className='my-5 text-[30px] mobile:text-[25px] mobile:leading-[30px] micro:text-[25px] micro:leading-[30px] text-black font-bold px-14 mini:px-6 mobile:px-4 micro:px-3'>{param.name ? 'Related Searches' : 'Our Inspirational Blog Creators'}</h1>
        <div className='flex justify-center items-center gap-x-5 gap-y-10 flex-wrap w-full px-14 mini:px-6 mobile:px-4 micro:px-3 pt-5'>
            {param?.name ? <>
                {allCreators.map((creator: UsersInterface) => creator.username.includes(param.name) && creator).map((i: UsersInterface, idx: number) => (
                    <CreatorSkeleton blogs={i.blogs} idx={idx} key={`${i}, ${idx}`} recommendedBy={i.recommendedBy} _id={i._id} email={i.email} image={i.image} username={i.username} />
                ))}
            </>:<>
                {allCreators.map((i: UsersInterface, idx: number) => (
                    <CreatorSkeleton blogs={i.blogs} idx={idx} key={`${i}, ${idx}`} recommendedBy={i.recommendedBy} _id={i._id} email={i.email} image={i.image} username={i.username} />
                ))}
            </>}
        </div>
    </div>
  )
}

export default memo(ShowCreatorsSection)