import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    location: 'Bangalore',
    level: 'Beginner level',
    salary: ''
  });
  
  const navigate = useNavigate()

  const [showDropdown, setShowDropdown] = useState(false);
  const editorRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Job Data:', formData);
    alert('Job posted successfully!');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'Programming',
      location: 'Bangalore',
      level: 'Beginner level',
      salary: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="shadow py-4 bg-white">
        <div className="px-5 flex justify-between items-center">
          <img onClick = {e => navigate('/')} className = 'max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
          <div className="flex items-center gap-3">
            <p className='max-sm:hidden'>Welcome, GreatStack</p>
            <div className="relative group">
              <img 
                className='w-8 border rounded-full cursor-pointer' 
                src={assets.company_icon}
                alt=""
              />
            <div className = 'absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
              <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                    <li className="py-1 px-4 cursor-pointer pr-10">Logout</li>
              </ul>
            </div> 
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        {/* Sidebar Navigation */}
        <div className='inline-block min-h-screen border-r-2 border-gray-200'>
          <ul className="flex flex-col items-start pt-5 text-gray-800">
              <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && 'bg-blue-100 border-r-4 border-blue-500' 
                }`
              }
              to="/dashboard/add-job"
            >
              <img className ='min-w-4' src={assets.add_icon} alt="" />
              <p className='max-sm:hidden'>Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && 'bg-blue-100 border-r-4 border-blue-500'
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <img className ='min-w-4' src={assets.home_icon} alt="" />
              <p className='max-sm:hidden'>Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && 'bg-blue-100 border-r-4 border-blue-500'
                }`
              }
              to="/dashboard/view-applications"
            >
              <img className ='min-w-4' src={assets.person_tick_icon} alt="" />
              <p className='max-sm:hidden'>View Applications</p>
            </NavLink>

          </ul>
        </div>
        
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;