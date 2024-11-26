import { SignedIn, SignedOut, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { Blocks, Building, Building2, Heart, Newspaper } from 'lucide-react'
import React, { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <header>
      <nav className="px-16 mini:px-6 mobile:px-6 micro:px-5 py-6 mini:py-4 mobile:py-5 micro:py-4 flex justify-between items-center">
        <div className="flex justify-between items-center gap-x-[15px] sm:gap-x-[25px] lgtab:gap-x-[25px] tablet:gap-x-[25px] mini:gap-x-[20px]">
          <Link to='/' className='flex justify-between items-center'>
            <img src="/Group_5.svg" alt='logo' className='micro:w-32' />
          </Link>
          <div className="md:flex hidden justify-between items-center self-end gap-x-[30px] pl-[15px] border-l-solid border-l-[1px] border-l-black">
              <Link to='/' className="opacity-70 hover:opacity-100">Blogs</Link>
              <Link to='/creators' className="opacity-70 hover:opacity-100">Creators</Link>
              <Link to='/most-liked-blogs' className="cursor-pointer opacity-70 hover:opacity-100">Most Liked</Link>
              <Link to='/create' className="cursor-pointer opacity-70 hover:opacity-100">Write a Blog</Link>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <SignedOut>
            <div className="flex justify-between items-center gap-x-2">
              <Link to='/sign-in' className="text-[14px] px-7 py-3 rounded-3xl bg-[#dadada] hover:bg-gray-300">Login</Link>
              <Link to='/sign-up' className="text-[14px] px-7 py-3 rounded-3xl bg-[#dadada] hover:bg-gray-300 mobile:hidden micro:hidden">Sign Up</Link>
            </div>
          </SignedOut>
          <SignedIn>
            <SignOutButton className="mobile:hidden micro:hidden text-[14px] px-6 py-2.5 rounded-3xl bg-[#dadada] hover:bg-gray-300 mr-3" />
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                }
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action onClick={() => navigate(`/${user?.username}/dashboard`)} label='Dashboard' labelIcon={<Blocks opacity={.8} size={18} />} />
                <UserButton.Action onClick={() => navigate('/')} label='Blogs' labelIcon={<Newspaper size={15} />} />
                <UserButton.Action onClick={() => navigate('/creators')} label='Creators' labelIcon={<Building size={15} />} />
                <UserButton.Action onClick={() => navigate('/most-liked-blogs')} label='Most Liked' labelIcon={<Heart size={15} />} />
                <UserButton.Action onClick={() => navigate('/create')} label='Create Blog' labelIcon={<Building2 size={15} />} />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default memo(Header)