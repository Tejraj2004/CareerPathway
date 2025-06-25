import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";

//Register a new company
export const registerCompany = async (req,res) =>{

const {name,email,password} = req.body;
//getting image file stored in req.file

const imageFile = req.file;

if(!name || !email || !password || !imageFile){
    return res.json({success:false, message:"Missing Details"})
}

try{
    const companyExists = await Company.findOne({email})
    
    if(companyExists){
        return res.json({success:false, message:'company already registered'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path)

    const company = await Company.create({
        name,
        email,
        password: hashPassword,
        image:imageUpload.secure_url
    })
    res.json({
        success:true,
        company:{
            _id: company._id,
            name: company.name,
            email:company.email,
            image:company.image
        },
        // also generate a jwt token for the first time user who will be authenticate dlater on during furthur login
        token: generateToken(company._id)
    })


} catch(error){
     res.json({success:false, message: error.mesage})
}

}

//Company Login
export const loginCompany = async(req,res) =>{

}
//get Company Data
export const getCompanyData = async(req,res) =>{

}

//post a job
export const postJob= async(req,res) =>{

}

//get Company Job Applicants
export const getCompanyJobApplicants = async(req,res) =>{

}

//get Company Posted Jobs
export const getCompanyPostedJobs = async(req,res) =>{

}

// change job application status
export const ChangeJobApplicationStatus = async(req,res) =>{

}

//change visibility
export const changeVisibility = async(req,res) =>{

}

