import React, { memo, useEffect, useRef} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Search } from 'lucide-react';
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import { searchBlogTitle } from './api/GraphqlCalls'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from './ReduxStore/ReduxSlices/SearchSlice';
import { AppDispatch, StoreType } from './ReduxStore/Store';

function SearchBlog({specificURl = '', searchOptions, placeholder} : {specificURl?: string, searchOptions?: [string], placeholder?: string}) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const initialSearchData = useSelector((state: StoreType) => state.searchSlice);
  const shouldFetchAppDataSlice = useSelector((state: StoreType) => state.shouldFetchAppDataSlice);

  const {data}: any = useQuery({
    queryKey: ['SearchBlogTitle'],
    queryFn: async () => request('https://ycdirectory-backend.vercel.app/graphql', searchBlogTitle),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: initialSearchData.length == 0 && shouldFetchAppDataSlice
  })

  useEffect(() => {
    if(data && data?.allBlogs){
      let newArray = data?.allBlogs?.map((item: any) => item.title)
      dispatch(searchActions.update(newArray));
    }
  }, [data?.allBlogs])

  const searchFn = (e) => specificURl ? navigate(`${specificURl}/search/${e}`) : navigate(`/search=${e}`)

  return (
    <div className='mt-5 w-full'>
      <Autocomplete
        id="custom-input-demo"
        options={searchOptions || initialSearchData}
        renderInput={(params) => (
          <div ref={params.InputProps.ref} className='w-[max-content] mobile:w-[85%] micro:w-[80%] mx-auto border-solid border-[4px] border-black rounded-[50px] flex justify-center items-center pr-3 bg-transparent'>
            <input type="text" {...params.inputProps} className='micro:text-[13px] mobile:text-[14px] w-96 mini:w-80 mobile:w-full micro:w-full px-4 py-3 mobile:px-4 mobile:py-2.5 micro:px-3 micro:py-2 bg-transparent placeholder:text-zinc-700' placeholder={placeholder || 'Search Blogs'} />
            <div onClick={() => {
              searchFn(params.inputProps.value);
              params.inputProps.value = '';
            }}>
              <Search />
            </div>
          </div>
        )}
      />
    </div>
  );
}


export default memo(SearchBlog);