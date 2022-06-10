import authServices from "../../services/authservices";
import { useState,  } from "react";
import { Link, useParams } from "react-router-dom";

export const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);

  const {userId, hash} = useParams();

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
        <div>
          <h1>Email verified successfully</h1>
          <Link to="/">
            <button>Go to Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 not found</h1>
      )}
    </>
  );
};
