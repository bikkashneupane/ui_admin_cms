import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import UsersTable from "../../components/tables/UsersTable";
import { useSelector } from "react-redux";

export const Users = () => {
  const { allUsers } = useSelector((state) => state.userInfo);

  const admins = allUsers?.filter((item) => item?.role === "admin");
  const customers = allUsers?.filter((item) => item?.role === "user");

  return (
    <div className="mx-auto max-w-7xl mt-6 px-4 sm:px-6 md:px-8 lg:px-10">
      <h2 className="text-2xl font-bold mb-2">Users</h2>
      <hr className="mb-10" />

      <TabGroup>
        <TabList
          as="div"
          className="bg-gray-900 flex flex-col max-w-min lg:max-w-full lg:justify-center md:gap-6 lg:flex-row  px-2 py-2 rounded-md shadow-lg bg-opacity-90"
        >
          <Tab className="text-purple-500 data-[selected]:bg-purple-700 data-[selected]:text-white font-bold text-base px-10 py-1 rounded-md shadow-lg">
            Admin
          </Tab>
          <Tab className="text-teal-500 data-[selected]:bg-teal-700 data-[selected]:text-white font-bold text-base px-6 py-1 rounded-md shadow-lg">
            Customers
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UsersTable users={admins} />
          </TabPanel>
          <TabPanel>
            <UsersTable users={customers} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
