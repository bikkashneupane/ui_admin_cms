import { useState } from "react";
import { RequestOTP } from "../../components/password-reset/RequestOTP";
import { ResetPassword } from "../../components/password-reset/ResetPassword";
import { requestOTP, resetPasswordAxios } from "../../features/user/userAxios";

export const ForgetPassword = () => {
  const [showForm, setShowForm] = useState("otp");
  const [response, setResponse] = useState({});
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);

  const handleOnOTPRequest = async (email) => {
    setTimer(60);
    setEmail(email);

    const res = await requestOTP({ email });
    setResponse(res);

    if (res?.status === "success") {
      setShowForm("reset");
      countDown();
    }
  };

  const handleOnPasswordReset = async (otp, password) => {
    const res = await resetPasswordAxios({ otp, email, password });
    setResponse(res);
  };

  const countDown = () => {
    const cd = setInterval(() => {
      setTimer((prevTimer) => {
        prevTimer === 1 && clearInterval(cd);
        return prevTimer - 1;
      });
    }, 1000);
  };

  const forms = {
    otp: <RequestOTP handleOnOTPRequest={handleOnOTPRequest} />,
    reset: <ResetPassword handleOnPasswordReset={handleOnPasswordReset} />,
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100  bg-dark">
      <div className="bg-light p-3 rounded" style={{ width: "450px" }}>
        {response?.message && (
          <>
            <alert
              className={response?.status === "success" ? "success" : "danger"}
            >
              {response?.message}
            </alert>

            <div className="m-3">
              OTP not received? request otp agin{" "}
              <Button
                variant={timer > 0 ? "warning" : "primary"}
                disabled={timer > 0}
                onClick={() => handleOnOTPRequest(email)}
                className="mt-2"
              >
                {timer > 0 ? `Request In ${timer}s` : `Request Again`}
              </Button>
            </div>
          </>
        )}

        {forms[showForm]}

        <div className="text-end mt-3">
          <a href="/">Login Now</a>
        </div>
      </div>
    </div>
  );
};
