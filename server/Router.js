const express = require("express");
const {userFeedbackRoute} = require('./Routes/UserFeedbackR')


// const {fileUploader}=require('./Routers/fileUploader.js')
const AllRouters = express.Router();

AllRouters.use('/feedback',userFeedbackRoute)


module.exports={AllRouters}