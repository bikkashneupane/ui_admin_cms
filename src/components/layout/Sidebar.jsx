import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbSitemap } from "react-icons/tb";
import { TbCube } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaUserSecret } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";

export const Sidebar = () => {
  const inputs = [
    {
      title: "Dashboard",
      to: "admin/dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      title: "Categories",
      to: "admin/categories",
      icon: <TbSitemap />,
    },
    {
      title: "Products",
      to: "admin/products",
      icon: <TbCube />,
    },
    {
      title: "Users",
      to: "admin/users",
      icon: <PiUsersThree />,
    },
    {
      title: "Orders",
      to: "admin/orders",
      icon: <FcSalesPerformance />,
    },
    {
      title: "Reviews",
      to: "admin/reviews",
      icon: <AiOutlineMessage />,
    },
  ];

  return (
    <Stack gap={3}>
      {inputs.map(({ to, icon, title }) => (
        <Link key={title} className="p-2 custom-sidenav" to={to}>
          {icon} &nbsp; {title}
        </Link>
      ))}

      <hr />
      <Link className="p-2  custom-sidenav" to={"admin/admins"}>
        <FaUserSecret /> &nbsp; Admins
      </Link>
    </Stack>
  );
};
