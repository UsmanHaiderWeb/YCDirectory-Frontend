import React, { memo } from 'react'
import { Rating } from '@mui/material'

const RateBlog = ({value, setValue}: {value: number, setValue: any}) => {
  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
      setValue(newValue);
      }}
      size='large'
    />
  )
}

export default memo(RateBlog)