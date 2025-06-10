import { createContext, useEffect, useState} from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

//arrow function, and App Context is for specifying various const like functions which can be accessed throughout our app without more componenst
export const AppContextProvider = (props)=>{

        const[searchFilter,setSearchFilter] = useState({
            title:'',
            location:''
        })
        
        const[isSearched,setIsSearched] = useState(false)

        const [jobs,setJobs] = useState([])

        const [showRecruiterLogin,setShowRecruiterLogin] = useState(false)

        //Function to fetch JobData from assets and store them in Job State variable which is being passed in value object and that will be used in other components
        const fetchJobs = async() => {
                setJobs(jobsData)//set the initialised empty jobs to a data fetched from JobsData in assets folder
        }

        //Execute the function fetchJobs whenever our project is loaded and for that we use useEffect
        useEffect (()=>{
                fetchJobs()
        },[])


        //In the value object many functions have been passed which will furthur be used or modified to display data or outlook as per our wish
        const value={
                setSearchFilter,searchFilter,
                isSearched, setIsSearched,
                jobs,setJobs,
                showRecruiterLogin,setShowRecruiterLogin
        }

        return (<AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>)
}