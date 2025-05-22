import React, { useState } from "react";
import "./MainLandingPage.css";
import FormComponent from "../FormComponent/FormComponent";
import feedbackImage from '../../assets/feedbackImage.jpeg'



function MainLandingPage() {
  const [buttonText, setbuttonText] = useState(true);
  const [hideError, setHideError] = useState();

  let textChanger = () => {
    buttonText ? setbuttonText(false) : setbuttonText(true);
    buttonText
      ? setHideError("CREATE A NEW ACCOUNT")
      : setHideError("SIGN IN TO YOUR ACCOUNT");
  };
  return (
    <div className="mainSection">
      <div className="container px-md-5">
        <div className="d-flex">
          <div className="col-12 col-md-6 shadow auth mx-md-4 ">
            {/* <p className="text-danger">{state.alert}</p> */}
            <div className="">
              <FormComponent errorStatus={hideError} />
            </div>
          </div>
          <div className="d-sm-none d-md-block col-12 col-md-6 explained">
            <h1 className="text-gradient">
             Welcome to the Evangadi Supplementary Courses Feedback Submission Portal!
            </h1>
            <ul>
              <li>Your feedback is 100% anonymous.</li>
              <li>
                Your voice matters help us improve your learning experience.
              </li>
              <li>
                We look forward to receiving your honest and constructive
                feedback.
              </li>
              <li>
                Your suggestions will directly influence course improvements.
              </li>
            </ul>
   <img className="imageStyle" src={feedbackImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLandingPage;
