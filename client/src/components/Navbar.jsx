import React, {useContext} from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()

  const navigate = useNavigate()
  const {setShowRecruiterLogin} = useContext(AppContext)
  return (
    <div className="shadow py-4 ">
      <div className="Container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick={()=>navigate('/')} className='w-80 h-auto cursor-pointer' src={assets.CareerPathImg} alt="" />
        {user ? (
          <div className='flex item-center gap-3'>
            <Link to={'/applications'}>Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button onClick={e=>setShowRecruiterLogin(true)}className="cursor-pointer text-gray-600">Recruiter Login</button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-600 cursor-pointer text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
        {/* adding the CSS of div containing two buttons , click inspect to view how div looks like */}
      </div>
     </div>
  );
};

export default Navbar;
