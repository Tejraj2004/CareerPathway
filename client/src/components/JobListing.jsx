import React, { useContext, useState,useEffect} from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  //import isSearch and SearchFilter from appcontext using useContext
  const { isSearched, searchFilter, setSearchFilter, jobs} = useContext(AppContext);
  
  //state variable to handle filter and close which show categories and locations accordingly
  const [showFilter,setShowFilter] = useState(true);

  const [currentPage,setCurrentPage] = useState(1)

  const [selectedCategories,setSelectedCategories] = useState([])
  const [selectedLocations,setSelectedLocations] = useState([])
  const [filteredJobs,setFilteredJobs] = useState(jobs)

  const handleCategoryChange = (category)=>{
      setSelectedCategories(
        prev => prev.includes(category) ? prev.filter(c => c!== category):[...prev,category]
      )
  }

  const handleLocationChange = (location)=>{
      setSelectedLocations(
        prev => prev.includes(location) ? prev.filter(c => c!== location):[...prev,location]
      )
  }

  useEffect(()=>{
    const matchesCategory = job =>selectedCategories.length === 0 || selectedCategories.includes(job.category)

    const matchesLocation = job =>selectedLocations.length === 0 || selectedLocations.includes(job.location)

    const matchesTitle = job =>searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

    const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

    const newFilteredJobs = jobs.slice().reverse().filter(
      job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
    //function(job) {
  //return matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job);
//}
    )
    setFilteredJobs(newFilteredJobs)
    setCurrentPage(1)
  },[jobs,selectedCategories,selectedLocations,searchFilter])


  return (
    //bada div hai jisme 1/4 aur 3/4 width wale donon hain
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>
        {/* Search Filter from Hero Component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className='font-medium text-lg mb-4'>Current Search</h3>
              <div classname='mb-4 text-gray-600'>
                {/* checking if searchFilter.title that is a title like full stack has been searched in that case in sidebar title will be displayed */}
                {searchFilter.title && (
                  <span className='inline-flex items-center gap-12 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                    {searchFilter.title}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className='ml-2 inline-flex items-center gap-12 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                    {searchFilter.location}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

          <button onClick={e=> setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
            {/* Jab sare categories display ho rahe honge tab close dikhayega aur jab nhi show ho rahe honge tab filter dikhayega */}
                  {showFilter ? "Close" : "Filters"}
          </button>

          {/* Category filter after adding Current search, and searched title and location within 1/4 screen */}
            {/* hidden for smaller screen */}
            

          {/* That means: no class is applied when showfilter is on, so the element is fully visible (unless some other styles hide it that is in mobile screen style or class is applied). */}
            <div className={showFilter ? "" : "max-lg:hidden"}>
              <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
              <ul className='space-y-4 text-gray-600'>
                {
                  // all categories are being listed one by one as li tag within a bigger ul tag and index value incrementing accordingly
                  JobCategories.map((category,index)=>(
                    <li className='flex gap-3 items-center' key={index}>
                        <input 
                        className='scale-125' 
                        type="checkbox"  
                        onChange={()=> handleCategoryChange(category)}
                        checked = {selectedCategories.includes(category)}
                        />
                        {category}
                    </li>
                  ))
                }
              </ul>
            </div>

            {/* location filter after c/}ategory filter */}
            {/* hidden for smaller screen */}
            <div className={showFilter ? "" : "max-lg:hidden"}>
              <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
              <ul className='space-y-4 text-gray-600'>
                {
                  // all locations are being listed one by one as li tag within a bigger ul tag and index value incrementing accordingly
                  JobLocations.map((location,index)=>(
                    <li className='flex gap-3 items-center' key={index}>
                        <input 
                        className='scale-125'
                        type="checkbox"  
                        onChange={()=> handleLocationChange(location)}
                        checked = {selectedLocations.includes(location)}
                        />
                        {location}
                    </li>
                  ))
                }
              </ul>
            </div>
      </div>
          {/* Job Listing  */}
                <section className='w-full lg:w-3/4 lg:ml-18 text-gray-800 max-lg:px-4'>
                  <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                  <p className='mb-8'>Get your desired job from top companies</p>

                {/* This div is wrapped inside bigger div which is the container and this will hold all the cards containing job details and is of the remaining 3/4th of screen */}
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {filteredJobs.slice((currentPage - 1)*6, currentPage * 6).map((job,index)=>(
                      // This loops over the jobsData array (which likely contains a list of job objects).,For each job, it renders a JobCard component:
                        <JobCard key={index} job={job}/>
                    ))}
                </div>

                  {/* Pagination which focuses on creating some number of pages and in page a number of jobcards will be there, and it will be within 3/4th of screen*/}
                  {filteredJobs.length >0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                      <a href="#job-list">
                            <img onClick={()=>setCurrentPage(Math.max(currentPage-1),1)} src={assets.left_arrow_icon} alt="" />
                      </a>
                      {/* Total no of pages = (total no of job cards i.e jobs.length / 6 ), because in each page 6 jobcards */}
                      {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index) => (
                          <a key={index} href="#job-list">
                            {/* setCurrentPage is there to display 6 cards in each page  */}
                            <button onClick = {() =>setCurrentPage(index + 1)}className={`cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index +1 ? 'bg-blue-100 text-blue-500' :'text-gray-500'}` }>{index + 1 }</button>
                          </a>
                      ))}
                      <a href="#job-list">
                        {/* when clicking on right arrow the next page will be displayed which will be the max(currentpage +1 , the total no of pages which is none other than jobs.length/6) */}
                            <img onClick = {()=> setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length/6)))}src={assets.right_arrow_icon} alt="" />
                      </a>
                    </div>
                  )}




                </section>
  
    </div>
  );
};

export default JobListing;
