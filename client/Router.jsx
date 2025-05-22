import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import LayOut from "./src/components/LayOut/LayOut.jsx"
import MainLandingPage from "./src/Pages/mainLandingPage/MainLandingPage.jsx";
import NotFoundPage from "./src/Pages/PageNotFound/PageNotFound.jsx"


function Routing() {
  return (
    // const verificationLink = `${baseURL}/users/verify/${base64EncodedJWT}/${base64EncodedKey}/${base64EncodedIV}`;
    <Routes>
    <Route path="/" element={<LayOut showFooter={true} showHeader={true}><MainLandingPage/></LayOut>} />
    <Route path="*" element={<LayOut showFooter={true} showHeader={true}><NotFoundPage/></LayOut>} />
  </Routes>
  );
}

export default Routing;
