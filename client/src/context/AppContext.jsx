import { createContext, useEffect, useState} from "react";
// import { jobsData } from "../assets/assets";

import axios from "axios";
import { toast } from 'react-toastify';
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext()

//arrow function, and App Context is for specifying various const like functions which can be accessed throughout our app without more componenst
export const AppContextProvider = (props)=>{

        const backendUrl = import.meta.env.VITE_BACKEND_URL

        const {user} = useUser()
        const {getToken} = useAuth()


        const[searchFilter,setSearchFilter] = useState({
            title:'',
            location:''
        })
        
        const[isSearched,setIsSearched] = useState(false)

        const [jobs,setJobs] = useState([])

        const [showRecruiterLogin,setShowRecruiterLogin] = useState(false)

        const [companyToken, setCompanyToken] = useState(null)
        const [companyData, setCompanyData] = useState(null)
        
        const [userData,setUserData] = useState(null)
        const [userApplications, setUserApplications] = useState([])

        //Function to fetch JobData from assets and store them in Job State variable which is being passed in value object and that will be used in other components
        const fetchJobs = async() => {
                // setJobs(jobsData)//set the initialised empty jobs to a data fetched from JobsData in assets folder
        try {
                const {data} = await axios.get(backendUrl+'/api/jobs')
                
                if(data.success){
                        setJobs(data.jobs)
                        console.log(data.jobs)
                } else{
                        toast.error(data.message)
                }
        } catch (error) {
                toast.error(error.message)
          }
        }
 
        //function to fetch Company data and prevent reload after once getting logged in
        const fetchCompanyData = async () => {
                try {
                       const {data} = await axios.get(backendUrl +'/api/company/company',{headers:{token:companyToken}}) 

                       if(data.success){

                        setCompanyData(data.company)
                        console.log(data)

                       } else{
                        toast.error(data.message)
                       }
                } catch (error) {
                        toast.error(error.message)
                }
        }

        //Function to fetch user data
        const fetchUserData = async () =>{
              try {
                const token = await getToken();

                const {data} = await axios.get(backendUrl +'/api/users/user',
                        {headers:{Authorization:`Bearer ${token}`}})
                if(data.success){
                        setUserData(data.user)
                } else{
                        toast.error(data.message)
                }
                } catch (error) {
                        toast.error(error.message)
              }  
        }

        // Function to fetch user's applied application data
        const fetchUserApplications = async () =>{
                try {
                    const token = await getToken()
                    
                    const {data} = await axios.get(backendUrl +'/api/users/applications',
                        {headers:{Authorization : `Bearer ${token}`}}
                    )

                    if(data.success){
                        setUserApplications(data.applications)
                    }else{
                        toast.error(data.message)
                    }
                } catch (error) {
                        toast.error(error.message)
                }
        }


        //Execute the function fetchJobs whenever our project is loaded and for that we use useEffect
        useEffect (()=>{
                fetchJobs()
                const storedCompanyToken = localStorage.getItem('companyToken')

                if(storedCompanyToken){
                        setCompanyToken(storedCompanyToken)
                }
        },[])

        useEffect(()=>{
                if(companyToken){
                     fetchCompanyData()   
                }
        },[companyToken])

       
        //when user gets logged in or logged out this function will get called using this useEffect
        useEffect(() => {
          if(user){
                fetchUserData()
                fetchUserApplications()
          }
        }, [user])
        
      
        //In the value object many functions have been passed which will furthur be used or modified to display data or outlook as per our wish
        const value={
                setSearchFilter,searchFilter,
                isSearched, setIsSearched,
                jobs,setJobs,
                showRecruiterLogin,setShowRecruiterLogin,
                companyToken, setCompanyToken,
                companyData, setCompanyData,
                backendUrl,
                userData,setUserData,
                userApplications,setUserApplications,
                fetchUserData,
                fetchUserApplications
        }

        return (<AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>)
}