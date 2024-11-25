import { Send } from 'lucide-react';
import React, { memo, useRef } from 'react'
import ShowToast from './helpers/ShowToast';

const SubscribeForm = () => {
  const input = useRef()

  return (
    <div className="subscribe-form">
        <form noValidate onSubmit={(e: FormEvent) => {
                e.preventDefault();
                if (input.current.value == '') return ShowToast('Please enter your email address.', 'error');
                if(!input.current.value.includes('@') || !input.current.value.includes('.com')) return ShowToast('Please enter a valid email address.', 'error');
                input.current.value = '';
                ShowToast('You will be notified for our up-coming services.', 'success');
            }}
        >
            <input ref={input} type="email" placeholder="Email Address" />
            <button type='submit'><Send stroke='white' /></button>
        </form>
    </div>
  )
}

export default memo(SubscribeForm)