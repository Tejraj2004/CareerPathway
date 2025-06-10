import React, {useContext,useRef} from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
const Hero = () => {

  const{setSearchFilter,setIsSearched} = useContext(AppContext)
  //set input field value using useref hook which persists value

  //for Search for jobs input field
  const titleRef=useRef(null)
  const locationRef=useRef(null)

  //set using setter function that is the values entered in search for jobs and location field
  const onSearch = () => {
    setSearchFilter({
      title:titleRef.current.value,
      location:locationRef.current.value
    })
    setIsSearched(true)
    console.log({
      title:titleRef.current.value,
      location:locationRef.current.value
    })
  }

return (
<div className='container 2xl:px-20 mx-auto my-10'>
  <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
    <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
    <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>
      Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
    </p>

    <div className='flex flex-col sm:flex-row items-center gap-8 bg-white rounded-lg text-gray-600 max-w-2xl mx-4 sm:mx-auto p-2'>
      <div className='flex items-center gap-2 bg-gray-100 rounded p-2 w-full sm:w-auto'>
        <img src={assets.search_icon} alt="Search" className='h-4 w-4' />
        <input
          type="text"
          placeholder='Search for Jobs'
          className='max-sm:text-xs bg-transparent p-1 outline-none w-full'
          ref={titleRef}
        />
      </div>

      <div className='flex items-center gap-2 bg-gray-100 rounded p-2 w-full sm:w-auto'>
        <img src={assets.location_icon} alt="Location" className='h-4 w-4' />
        <input
          type="text"
          placeholder='Location'
          className='max-sm:text-xs bg-transparent p-1 outline-none w-full'
          ref={locationRef}
        />
      </div>

      <button onClick={onSearch} className='cursor-pointer bg-blue-600 px-6 py-2 rounded text-white m-1'>
        Search
      </button>
    </div>
  </div>

  <div className='flex border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md'>
  <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
    <p className='font-medium'>Trusted by</p>
    <img className='h-6' src={assets.walmart_logo} alt="" />
    <img className='h-6' src={assets.accenture_logo} alt="" />
    <img className='h-6' src={assets.samsung_logo} alt="" />
    <img className='h-6' src={assets.amazon_logo} alt="" />
    <img className='h-6' src={assets.microsoft_logo} alt="" />
    <img className='h-6' src={assets.adobe_logo} alt="" />
  </div>
</div>

</div>


  );
};

export default Hero;
