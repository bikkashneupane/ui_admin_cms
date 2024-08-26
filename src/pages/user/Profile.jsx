import { useState } from "react";
import { CustomInput } from "../../components/common/CustomInput";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export const Profile = () => {
  const { form, handleOnChange } = useForm({});
  const [openDisclosure, setOpenDisclosure] = useState(null);

  const detailInputs = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Jon",
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Doe",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "555-5555-555",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "user@email.com",
      required: true,
      disabled: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
    },
  ];

  const passwordInputs = [
    {
      label: "Current Password",
      name: "currentPassword",
      type: "password",
      placeholder: "********",
      required: true,
    },
    {
      label: "New Password",
      name: "newPassword",
      type: "password",
      placeholder: "********",
      required: true,
    },
  ];

  const handleToggle = (id) => {
    setOpenDisclosure(openDisclosure === id ? null : id);
  };

  return (
    <div className="flex justify-center items-center my-20">
      <div className="rounded w-full max-w-lg">
        {/* Details Disclosure */}
        <Disclosure as="div" className="border-b border-gray-200" defaultOpen>
          <DisclosureButton
            onClick={() => handleToggle(1)}
            className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500"
          >
            <span className="font-medium text-gray-900">Details</span>
            <span className="ml-6 flex items-center">
              <PlusIcon
                aria-hidden="true"
                className={`h-5 w-5 ${
                  openDisclosure === 1 ? "hidden" : "block"
                }`}
              />
              <MinusIcon
                aria-hidden="true"
                className={`h-5 w-5 ${
                  openDisclosure === 1 ? "block" : "hidden"
                }`}
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel
            className={`pt-6 ${openDisclosure === 1 ? "block" : "hidden"}`}
          >
            <form className="shadow-lg p-4 bg-white rounded-md">
              <h3 className="text-center mb-4 font-bold">
                Update User Profile
              </h3>
              {detailInputs.map((item) => (
                <CustomInput key={item.name} {...item} />
              ))}
              <button
                className="w-100 mt-2 bg-teal-600 text-white py-3 rounded-lg "
                type="submit"
              >
                Update Profile
              </button>
              <div className="mt-3 text-end">
                Forget Password?
                <Link to={"/forget-password"}>
                  <span className="font-medium text-teal-700">
                    &nbsp;Reset Password!
                  </span>
                </Link>
              </div>
            </form>
          </DisclosurePanel>
        </Disclosure>

        {/* Password Disclosure */}
        <Disclosure as="div" className="border-b border-gray-200">
          <DisclosureButton
            onClick={() => handleToggle(2)}
            className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500"
          >
            <span className="font-medium text-gray-900">Password</span>
            <span className="ml-6 flex items-center">
              <PlusIcon
                aria-hidden="true"
                className={`h-5 w-5 ${
                  openDisclosure === 2 ? "hidden" : "block"
                }`}
              />
              <MinusIcon
                aria-hidden="true"
                className={`h-5 w-5 ${
                  openDisclosure === 2 ? "block" : "hidden"
                }`}
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel
            className={`pt-6 ${openDisclosure === 2 ? "block" : "hidden"}`}
          >
            <form className="shadow-lg p-4 bg-white rounded-md">
              <h3 className="text-center mb-4 font-bold">
                Update User Profile
              </h3>
              {passwordInputs.map((item) => (
                <CustomInput key={item.name} {...item} />
              ))}
              <button
                className="w-100 mt-2 bg-teal-600 text-white py-3 rounded-lg "
                type="submit"
              >
                Update Profile
              </button>
              <div className="mt-3 text-end">
                Forget Password?
                <Link to={"/forget-password"}>
                  <span className="font-medium text-teal-700">
                    &nbsp;Reset Password!
                  </span>
                </Link>
              </div>
            </form>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
};
