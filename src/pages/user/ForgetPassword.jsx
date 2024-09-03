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
        if (prevTimer === 1) clearInterval(cd);
        return prevTimer - 1;
      });
    }, 1000);
  };

  const forms = {
    otp: <RequestOTP handleOnOTPRequest={handleOnOTPRequest} />,
    reset: <ResetPassword handleOnPasswordReset={handleOnPasswordReset} />,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="px-6 py-16 rounded shadow-md w-full max-w-md border-2 border-gray-700">
        {response?.message && (
          <>
            <div
              className={`p-4 mb-4 rounded ${
                response?.status === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {response?.message}
            </div>

            <div className="mt-3 text-center">
              OTP Not Received? Request OTP again{" "}
              <button
                className={`mt-2 mb-4 px-10 py-2 rounded ${
                  timer > 0
                    ? "bg-yellow-500 text-white"
                    : "bg-teal-500 text-white"
                }`}
                disabled={timer > 0}
                onClick={() => handleOnOTPRequest(email)}
              >
                {timer > 0 ? `Request In ${timer}s` : `Request Again`}
              </button>
            </div>
          </>
        )}

        {forms[showForm]}

        <div className="text-right mt-3 pe-1">
          <a href="/" className="text-teal-600 hover:underline font-bold">
            Login Now
          </a>
        </div>
      </div>
    </div>
  );
};
