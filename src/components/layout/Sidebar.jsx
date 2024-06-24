import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <Stack gap={3}>
      <Link className="p-2 nav-link" to={"admin/dashboard"}>
        Dashboard
      </Link>
      <Link className="p-2 nav-link" to={"admin/categories"}>
        Categories
      </Link>
      <Link className="p-2 nav-link" to={"admin/products"}>
        Products
      </Link>
      <Link className="p-2 nav-link" to={"admin/users"}>
        Users
      </Link>
      <Link className="p-2 nav-link" to={"admin/orders"}>
        Orders
      </Link>
      <Link className="p-2 nav-link" to={"admin/reviews"}>
        Reviews
      </Link>

      <hr />
      <Link className="p-2 nav-link" to={"admin/admins"}>
        Admins
      </Link>
    </Stack>
  );
};
