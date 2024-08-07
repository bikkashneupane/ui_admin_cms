import { useEffect, useRef } from "react";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import { loginUserAction } from "../../features/user/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    user?._id && navigate("/admin/dashboard");
  }, [user?._id, dispatch, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      return toast.error("Email and Password must be provided");
    }

    dispatch(loginUserAction({ email, password }));
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "user@email.com",
      required: true,
      inputRef: emailRef,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
      inputRef: passwordRef,
    },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="bg-light rounded" style={{ width: "450px" }}>
        <form className="shadow-lg p-4" onSubmit={handleOnSubmit}>
          <h3 className="text-center">Admin Login</h3>
          {inputs.map((item) => (
            <CustomInput key={item.name} {...item} />
          ))}
          <button
            className="w-100 mt-2 py-2 bg-teal-600 text-white rounded-md shadow-2xl"
            type="submit"
          >
            Login
          </button>

          <div className="mt-3 text-end">
            Forget Password?
            <Link to={"/forget-password"}> Reset Password!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
