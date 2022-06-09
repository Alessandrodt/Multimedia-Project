import authServices from "../../services/authservices";
import { useState } from "react";
import { Link } from "react-router-dom";

export const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [ketchum, setKetchum] = useState("");

  const verifyUser = {
    hash: ketchum,
  };

  const verifyEmailUrl = () => {
    try {
      authServices.confirmUser(verifyUser).then((response) => {
        setKetchum(response.data);
        setValidUrl(true);
      });
    } catch (error) {
      console.log(error);
      setValidUrl(false);
    }
  };
  verifyEmailUrl();

  //   const verifyEmailUrl = async () => {
  //     try {
  //       const url = `http://smear-backend.test/api/v1/${param.id}/verify/${param.token}`;
  //       const {
  //         data = {
  //           hash: "string",
  //         },
  //       } = await axios.patch(url);
  //       console.log(data);
  //       setValidUrl(true);
  //     } catch (error) {
  //       console.log(error);
  //       setValidUrl(false);
  //     }
  //   };
  //   verifyEmailUrl();

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
