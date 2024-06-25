import { useState } from "react";
import { RequestOTP } from "../../components/password-reset/RequestOTP";
import { ResetPassword } from "../../components/password-reset/ResetPassword";
import { requestOTP, resetPasswordAxios } from "../../features/user/userAxios";
import { Alert } from "react-bootstrap";

export const ForgetPassword = () => {
  const [showForm] = useState("reset");
  let [timer, setTimer] = useState(10);

  const [email, setEmail] = useState("");
  const [response, setResponse] = useState({});

  const countDown = () => {
    const cd = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(cd);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOnOTPRequest = async (email) => {
    setEmail(email);
    const res = await requestOTP({ email });
    setResponse(res);
    countDown();
  };

  const handleOnPasswordReset = async (otp, password) => {
    console.log(email, "adfghjk");
    const res = await resetPasswordAxios({ otp, email, password });
    setResponse(res);
  };

  const forms = {
    otp: (
      <RequestOTP handleOnOTPRequest={handleOnOTPRequest} response={response} />
    ),
    reset: <ResetPassword handleOnPasswordReset={handleOnPasswordReset} />,
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="bg-light rounded" style={{ width: "450px" }}>
          {timer}
          {response.message && (
            <Alert
              className="m-2"
              variant={response?.status === "success" ? "success" : "danger"}
            >
              {response?.message}
            </Alert>
          )}
          {forms[showForm]}
        </div>
      </div>
    </div>
  );
};
