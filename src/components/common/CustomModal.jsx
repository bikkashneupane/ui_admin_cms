import { useEffect } from "react";

export const CustomModal = ({
  show,
  hideModal,
  setSubCat,
  title,
  children,
  ...rest
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" {...rest}>
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-70"
        onClick={() => {
          hideModal();
          setSubCat && setSubCat();
        }}
      ></div>

      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-6 mx-auto bg-gray-800 rounded-lg shadow-lg">
          <div className="flex justify-between items-center pb-3 border-b border-b-gray-600">
            <h3 className="text-lg font-medium text-center w-full">{title}</h3>

            <button
              onClick={hideModal}
              className="hover:bg-gray-700 p-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
