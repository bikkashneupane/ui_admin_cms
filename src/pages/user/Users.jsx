import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import UsersTable from "../../components/tables/UsersTable";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Users = () => {
  const { allUsers } = useSelector((state) => state.userInfo);

  const admins = allUsers?.filter((item) => item?.role === "admin");
  const customers = allUsers?.filter((item) => item?.role === "user");

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex justify-between gap-4 mb-2">
        <h2 className="text-xl font-bold">Users</h2>
        <Link
          to={"/admin/new"}
          className="px-6 py-2 rounded-md bg-purple-600 hover:bg-purple-500"
        >
          Add New User
        </Link>
      </div>
      <hr className="mb-10" />

      <TabGroup>
        <TabList
          as="div"
          className="bg-[#1E1E1E] flex flex-col max-w-min lg:max-w-full lg:justify-center md:gap-6 lg:flex-row px-2 rounded-md gap-2"
        >
          <Tab className="text-purple-500 bg-[#2C2C2C] data-[selected]:bg-purple-700 data-[selected]:text-white font-bold text-base px-10 py-2 rounded-md">
            Admin
          </Tab>
          <Tab className="text-teal-500 bg-[#2C2C2C] data-[selected]:bg-teal-700 data-[selected]:text-white font-bold text-base px-6 py-2 rounded-md">
            Customers
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <h1 className="mt-3 mb-1 font-semibold text-right">
              {admins.length || 0} Admin(s) found
            </h1>{" "}
            <UsersTable users={admins} />
          </TabPanel>
          <TabPanel>
            <h1 className="mt-3 mb-1 font-semibold text-right">
              {customers.length || 0} Customer(s) found
            </h1>{" "}
            <UsersTable users={customers} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
