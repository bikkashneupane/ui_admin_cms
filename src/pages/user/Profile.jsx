import { CustomInput } from "../../components/common/CustomInput";
import { editProfileDetail } from "../../features/user/userAction";
import { useForm } from "../../hooks/useForm";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

const detailInput = [
  {
    placeholder: "First Name",
    name: "firstName",
    type: "text",
    required: true,
  },
  {
    placeholder: "Last Name",
    name: "lastName",
    type: "text",
    required: true,
  },
  {
    placeholder: "Phone",
    name: "phone",
    type: "number",
    required: true,
  },
];

const passwordInput = [
  {
    placeholder: "Current Password",
    name: "currentPassword",
    type: "password",
    required: true,
  },
  {
    placeholder: "New Password",
    name: "newPassword",
    type: "password",
    required: true,
  },
  {
    placeholder: "Confirm New Password",
    name: "confirmPassword",
    type: "password",
    required: true,
  },
];

export const Profile = () => {
  const { user } = useSelector((state) => state.userInfo);
  const { form, setForm, handleOnChange } = useForm({ ...user } || {});
  const dispatch = useDispatch();

  // handle form submit
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const { name } = e.target;

    let updateObj = {};
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      currentPassword,
      newPassword,
      confirmPassword,
    } = form;

    switch (name) {
      case "details":
        updateObj = { firstName, lastName, phone, password };
        break;
      case "email":
        updateObj = { email, password };
        break;
      case "password":
        if (newPassword !== confirmPassword) {
          return alert("New Password Must Match");
        }
        updateObj = { currentPassword, newPassword };
        break;
      default:
        updateObj = {};
    }

    dispatch(editProfileDetail(updateObj, name));
  };

  // handle form reset
  const resetForm = () => {
    setForm({ ...user } || {});
  };

  return (
    <div className="flex justify-center items-center mt-32">
      <div className="rounded w-full max-w-lg">
        <div className="w-full md:max-w-4xl mx-auto px-4 py-16 border-2 border-gray-700 rounded-lg">
          <TabGroup as="div" className="py-2 px-6">
            <TabList className="flex gap-2 justify-center border-b border-gray-700 p-2 rounded-md text-sm font-semibold">
              <Tab
                onClick={resetForm}
                className="bg-gray-700 data-[selected]:bg-purple-700 data-[selected]:text-white px-9 py-3 rounded-md "
              >
                Details
              </Tab>
              <Tab
                as="button"
                onClick={resetForm}
                className="bg-gray-700 data-[selected]:bg-purple-700 data-[selected]:text-white px-9 py-3 rounded-md "
              >
                Password
              </Tab>
            </TabList>

            <TabPanels>
              {/* Details Panel */}
              <TabPanel className="pt-6">
                <form
                  className="space-y-4"
                  onSubmit={handleProfileUpdate}
                  name="details"
                >
                  {detailInput?.map((item, i) => (
                    <CustomInput
                      key={i}
                      {...item}
                      onChange={handleOnChange}
                      value={form[item?.name] || ""}
                    />
                  ))}
                  <button
                    type="submit"
                    className="mt-10 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  >
                    Update Profile
                  </button>
                </form>
              </TabPanel>

              {/* Password Panel */}
              <TabPanel className="pt-6">
                <form
                  className="space-y-4"
                  onSubmit={handleProfileUpdate}
                  name="password"
                >
                  {passwordInput?.map((item, i) => (
                    <CustomInput
                      key={i}
                      {...item}
                      onChange={handleOnChange}
                      value={form[item?.name] || ""}
                    />
                  ))}
                  <button
                    type="submit"
                    className="mt-10 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  >
                    Update Password
                  </button>
                </form>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};
