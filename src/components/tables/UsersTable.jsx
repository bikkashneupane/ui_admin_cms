const UsersTable = ({ allUsers = [] }) => {
  return (
    <div>
      <div className="overflow-x-scroll">
        <table className="min-w-[100vw] bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">First</th>
              <th className="py-2 px-4 text-left">Last</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map((item, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{item?.email}</td>
                  <td className="py-2 px-4">{item?.firstName}</td>
                  <td className="py-2 px-4">{item?.lastName}</td>
                  <td className="py-2 px-4">{item?.role}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      className="bg-yellow-500 text-white py-2 px-8 rounded hover:bg-yellow-600 transition"
                      //   onClick={() => {
                      //     setSelectedCategory(item);
                      //     showModal();
                      //   }}
                    >
                      Edit
                    </button>
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
    </div>
  );
};

export default UsersTable;
