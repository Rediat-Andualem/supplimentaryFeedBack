const express = require("express");
const {userCreateRouter} = require('./Routers/UserR.js')
const {projectSubmissionRouter} = require('./Routers/ProjectSubmissionR.js')
const {ProjectForStudentsRoute} = require('./Routers/ProjectsR.js')

// const {fileUploader}=require('./Routers/fileUploader.js')
const AllRouters = express.Router();

AllRouters.use('/users',userFeedback)
AllRouters.use('/admin',adminDashboard)

module.exports={AllRouters}