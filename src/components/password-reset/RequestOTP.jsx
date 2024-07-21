import { useRef } from "react";
import { CustomInput } from "../common/custom-input/CustomInput";
import { Link } from "react-router-dom";

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
    <form className="shadow-lg p-4" onSubmit={handleOnSubmit}>
      <h3 className="text-center">Request OTP</h3>
      <hr />

      <CustomInput {...inputs} />

      <button className="w-100 mt-2" type="submit">
        Request Now
      </button>
    </form>
  );
};
