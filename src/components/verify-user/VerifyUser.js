import authServices from "../../services/authServices";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "@mantine/core";

export const EmailVerify = () => {
  const {userId, hash} = useParams();

  const [validUrl, setValidUrl] = useState(false);

  const verifyEmailUrl = () => {
    try {
      authServices.confirmUser(userId, hash).then(() => {
        setValidUrl(true);
      });
    } catch (error) {
      console.log(error);
      setValidUrl(false);
    }
  };
  verifyEmailUrl();

  return (
    <>
      {validUrl ? (
        <div className="wrapper-success">
          <span className="bg-success">
            <svg width="1400" height="1020" viewBox="0 0 1400 1020" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1370.7 29.9339C1409.77 69.782 1409.77 134.177 1370.7 174.025L570.657 990.114C531.592 1029.96 468.464 1029.96 429.399 990.114L29.2891 582.069C-9.76305 542.221 -9.76305 477.827 29.2891 437.979C68.3476 398.13 131.664 398.13 170.728 437.979L497.215 773.659L1229.44 29.9339C1268.51 -9.97797 1331.64 -9.97797 1370.7 29.9339Z" fill="#C7C7C7"/>
            </svg>
          </span>
          <span className="img-success">
            <svg width="424" height="310" viewBox="0 0 424 310" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M415.127 9.09756C426.958 21.2083 426.958 40.7792 415.127 52.8899L172.827 300.917C160.996 313.028 141.878 313.028 130.047 300.917L8.87042 176.903C-2.95681 164.793 -2.95681 145.222 8.87042 133.111C20.6995 121 39.8753 121 51.7063 133.111L150.585 235.132L372.346 9.09756C384.177 -3.03252 403.296 -3.03252 415.127 9.09756Z"/>
            </svg>
          </span>
          <div className="success">
            <div className="text-success">
              <h3>Thank you</h3>
              <p>you are ready to start!</p>
            </div>
            <div className="link-login">
              <Link to="/">
                Go to Login
              </Link>
            </div>      
          </div>
        </div>
      ) : (
        <Loader className="wrapper-loader"/>
      )}
    </>
  );
};
