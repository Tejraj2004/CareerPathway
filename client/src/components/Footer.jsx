import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
        <img className='cursor-pointer w-80 h-auto' width={160} src={assets.CareerPathImg} alt="" />
        <p className='flex-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden '>| All right reserved. Copyright @job-portal</p>
        <div className='flex gap-2.5'>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img width={38} src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img width={38} src={assets.twitter_icon} alt="X (Twitter)" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img width={38} src={assets.instagram_icon} alt="Instagram" />
            </a>
        </div>

    </div>
  )
}

export default Footer