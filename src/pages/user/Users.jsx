import UsersTable from "../../components/tables/UsersTable";
import { useSelector } from "react-redux";

export const Users = () => {
  const { allUsers } = useSelector((state) => state.userInfo);

  const users = allUsers.filter((item) => item.role === "user");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Users</h2>
      <hr className="mb-2" />

      {/* Users Table */}
      <UsersTable allUsers={users} />
    </div>
  );
};
