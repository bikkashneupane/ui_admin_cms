import { useEffect, useRef } from "react";
import { loginUserAction } from "../../features/user/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/common/CustomInput";

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
    <div className="h-screen bg-dark">
      <div className="flex items-center flex-col pt-36">
        <div className="mb-8 text-sm text-teal-500 text-left space-y-2">
          <h1 className="text-center text-white underline font-bold">
            Sample User
          </h1>
          <h1>
            <span className="text-white">Email</span>: admin@gmail.com
          </h1>
          <h1>
            <span className="text-white">Password</span>: 11
          </h1>
        </div>
        <div className="rounded" style={{ width: "450px" }}>
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

            <div className="mt-3 text-end text-sm">
              Forget Password?
              <Link to={"/forget-password"}> Reset Password!</Link>
            </div>
          </form>
        </div>
        <p className="mt-10 font-bold text-teal-600">
          <span className="font-bold">Disclaimer : </span>Edit/ Delete Feature
          is Disabled for security purposes on certain part of webpage.{" "}
        </p>
      </div>
    </div>
  );
};
