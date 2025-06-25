import express from 'express'
import upload from '../config/multer.js'
import {ChangeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany} from '../controllers/companytocontol.js'
const router = express.Router()

//Register a company
router.post('/register',upload.single('image'),registerCompany)

//company login
router.post('/login',loginCompany)

//get company data
router.get('/company',getCompanyData)

//post a job
router.post('/post-job',postJob)

//get Applicants Data of company
router.get('/applicants',getCompanyJobApplicants)

//get company job list
router.get('/list-jobs',getCompanyPostedJobs)

//change application status
router.post('/change-status',ChangeJobApplicationStatus)

router.post('/change-visibility',changeVisibility)

export default router

