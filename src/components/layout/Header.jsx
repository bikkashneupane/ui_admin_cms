import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../features/user/userAction";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);

  const handleOnLogout = () => {
    dispatch(logoutUserAction());
    setShowProfile(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    if (showProfile) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <>
      <nav className="bg-gray-200 text-gray-700 shadow-md min-h-[5vh]">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          <div className="text-lg font-bold tracking-widest font-mono px-2"></div>

          <div className="relative flex items-center" ref={dropdownRef}>
            <button
              className="flex items-center focus:outline-none hover:text-orange-500"
              onClick={() => setShowProfile(!showProfile)}
            >
              <FaUserAlt className="text-xl" />
            </button>

            {showProfile && (
              <div className="absolute top-3 right-0 mt-3 w-48 bg-gray-200 text-gray-800 rounded-lg shadow-lg z-10">
                <div className="py-2">
                  {user?._id ? (
                    <button
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200 hover:text-orange-500"
                      onClick={handleOnLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-orange-500"
                      onClick={() => setShowProfile(false)}
                    >
                      Login
                    </Link>
                  )}
                  <hr className="border-gray-200" />
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-200 hover:text-orange-500"
                    onClick={() => setShowProfile(false)}
                  >
                    Profile
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
