import React, { memo } from 'react'
import { SignUp } from '@clerk/clerk-react'

const SignUpForm = () => {
  return (
    <div className='w-full flex justify-center items-center py-5'>
        <SignUp
          signInUrl='/sign-in'
          appearance={{
            elements: {
                cardBox: 'w-[450px]',
                logoImage: 'size-40',
                card: 'micro:px-4',
            },
            layout: {
              logoImageUrl: '/Group_5.svg'
            }
          }}
        />
    </div>
  )
}

export default memo(SignUpForm)