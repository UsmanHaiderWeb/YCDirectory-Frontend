import React, { memo, useEffect, useRef } from 'react'
import ContentWrapper from './components/ContentWrapper'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'
import { CreateUser } from './components/api/AxiosCalls'
import { useCookies } from 'react-cookie'
import LoaderSpinner from './components/LoaderSpinner'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { X } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './components/ReduxStore/Store'
import { ShouldFetchActions } from './components/ReduxStore/ReduxSlices/ShouldFetcAppData'

const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const loader = useRef<HTMLDivElement>(null);
  const [cookie, setCookie] = useCookies(['myOwntoken']);
  const dispatch = useDispatch<AppDispatch>(); 

  const { mutate, isPending } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: CreateUser,
    onSuccess: (data) => {
      setCookie('myOwntoken', data.token);
      dispatch(ShouldFetchActions.update(true));
    },
    onError: () => dispatch(ShouldFetchActions.update(true)),
  });

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      mutate(user.id);
    } else dispatch(ShouldFetchActions.update(true))
    if(loader.current){
      if(isPending || !isLoaded){
        loader.current.style.display = 'flex';
      } else {
        window.scrollTo(0, 0);
        loader.current.style.transition = 'opacity 1s ease-in-out';
        loader.current.style.opacity = '0';
        setTimeout(() => {
          if(loader.current){
            loader.current.style.display = 'none';
          }
        }, 1000);
      }
    }
  }, [isLoaded, isSignedIn, mutate, user?.id])

  useEffect(() => {
    if (loader.current) {
      if (isPending || !isLoaded || !isSignedIn) {
        loader.current.style.display = 'flex';
      } else {
        loader.current.style.transition = 'opacity 1s ease-in-out';
        loader.current.style.opacity = '0';
        setTimeout(() => {
          if (loader.current) {
            loader.current.style.display = 'none';
          }
        }, 1000);
      }
    }
  }, [isPending, isLoaded, isSignedIn]);

  return (
    <div className='w-full min-h-screen bg-[#F2F2F2]'>
      <ToastContainer />
      <div ref={loader} className='fixed top-0 left-0 bg-[#F2F2F2] z-10 justify-center items-center flex w-full h-screen'>
        <LoaderSpinner />
      </div>
      {(!isPending && isLoaded) &&
        <ContentWrapper />
      }
    </div>
  );
};

export default memo(App);