import { useState } from "react";
import { CustomModal } from "../common/CustomModal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditUserRole } from "../form/EditUserRole";
import { useModal } from "../../hooks/useModal";
import { editRoleAction } from "../../features/user/userAction";
import { TrashIcon } from "@heroicons/react/24/outline";

const editUserModalName = "editUserRoleModal";

const UsersTable = ({ users = [] }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const { showModal, hideModal, isModalVisible } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserRoleChange = (obj) => {
    dispatch(editRoleAction(obj, () => hideModal(editUserModalName), navigate));
  };

  return (
    <div className="overflow-x-scroll rounded-lg">
      {isModalVisible(editUserModalName) && (
        <CustomModal
          title={"Edit User Role"}
          show={isModalVisible(editUserModalName)}
          hideModal={() => hideModal(editUserModalName)}
        >
          <EditUserRole
            selectedUser={selectedUser}
            handleUserRoleChange={handleUserRoleChange}
          />
        </CustomModal>
      )}

      <table className="min-w-full font-medium bg-[#1E1E1E] rounded-md text-white">
        <thead>
          <tr className="bg-teal-800">
            <th className="py-2 px-4 text-left w-1/6">#</th>
            <th className="py-2 px-4 text-left w-1/6">Role</th>
            <th className="py-2 px-4 text-left w-1/6">Email</th>
            <th className="py-2 px-4 text-left w-1/6">First</th>
            <th className="py-2 px-4 text-left w-1/6">Last</th>
            <th className="py-2 px-4 text-left w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr key={i} className="border-b border-gray-800 text-sm">
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-2 items-center">
                    <h1>{user?.role}</h1>
                    <span
                      className="px-2 py-1 rounded-md cursor-pointer bg-green-700 text-white"
                      onClick={() => {
                        showModal(editUserModalName);
                        setSelectedUser(user);
                      }}
                    >
                      Change
                    </span>
                  </div>
                </td>
                <td className="py-2 px-4">{user?.email}</td>
                <td className="py-2 px-4">{user?.firstName}</td>
                <td className="py-2 px-4">{user?.lastName}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="p-2 bg-[#1E1E1E] hover:bg-red-800 hover:text-white rounded text-red-600">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
