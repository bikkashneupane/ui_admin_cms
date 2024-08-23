import { useState } from "react";
import { CustomModal } from "../common/CustomModal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditUserRole } from "../form/EditUserRole";
import { useModal } from "../../hooks/useModal";
import { editRoleAction } from "../../features/user/userAction";

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
    <div className="overflow-x-scroll mt-4 rounded-lg">
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

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">First</th>
            <th className="py-2 px-4 text-left">Last</th>
            <th className="py-2 px-4 text-left w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr key={i} className="border-b border-gray-200 text-sm">
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-2 items-center">
                    <h1>{user?.role}</h1>
                    <span
                      className="px-2 py-1 rounded-md shadow-md cursor-pointer bg-green-500 text-white"
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
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    //   onClick={() => {
                    //     dispatch(deleteCategoryAction(item?._id));
                    //   }}
                  >
                    Delete
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
