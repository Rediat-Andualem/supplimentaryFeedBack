const express = require('express');
const { userFeedback} = require('../controllers/UserFeedbackC'); 


let userFeedbackRoute = express.Router();

userFeedbackRoute.post('/feedbacks', userFeedback);  



module.exports = {userFeedbackRoute};
    // 1.User role = "0"
    // 2.Admin role ="1"
    // 3.Sub Admin role = "2"
    // 4.Advert Reviewer ="3"
   