import { useRef } from "react";
import { CustomInput } from "../common/CustomInput";

export const RequestOTP = ({ handleOnOTPRequest }) => {
  const emailRef = useRef("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    email && handleOnOTPRequest(email);
  };

  const inputs = {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "user@email.com",
    required: true,
    inputRef: emailRef,
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h3 className="text-center mb-4 font-bold text-base">Request OTP</h3>
      <hr className="mb-4" />

      <CustomInput {...inputs} />

      <button
        className="w-100 mt-2 bg-teal-600 text-white py-2 rounded-md shadow-lg"
        type="submit"
      >
        Request Now
      </button>
    </form>
  );
};
