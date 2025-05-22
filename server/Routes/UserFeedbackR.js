const express = require('express');
const { submitFeedback,getFilteredFeedback,deleteFeedback} = require('../controllers/UserFeedbackC'); 


let userFeedbackRoute = express.Router();

userFeedbackRoute.post('/submitFeedbacks', submitFeedback);  
userFeedbackRoute.post('/getFeedback', getFilteredFeedback);  
userFeedbackRoute.post('/deleteFeedback:feedbackId', deleteFeedback);  



module.exports = {userFeedbackRoute};
