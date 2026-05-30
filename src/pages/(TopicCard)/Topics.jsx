import {useState,useEffect} from 'react'

const Topics = () => {

    const URL = `${import.meta.env.VITE_API_URL}/api/get/topic?history_group=1780167910`
  return (
    <div>Topics</div>
  )
}

export default Topics