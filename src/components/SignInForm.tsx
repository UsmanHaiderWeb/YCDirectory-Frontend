import React, { memo } from 'react'
import { SignIn } from '@clerk/clerk-react'

const SignInForm = () => {
  return (
    <div className='w-full flex justify-center items-center py-5'>
        <SignIn
            signUpUrl='/sign-up'
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

export default memo(SignInForm)