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
        <div>
          <h1>Email verified successfully</h1>
          <Link to="/">
            <button>Go to Login</button>
          </Link>
        </div>
      ) : (
        <Loader className="wrapper-center"/>
      )}
    </>
  );
};
