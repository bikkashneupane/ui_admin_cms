import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../features/user/userAction";
import { Link } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  return (
    <Navbar expand="md" className="bg-dark" variant="dark">
      <Container>
        {/* <Navbar.Brand href="#home">Online Store</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={<FaUserAlt />} id="basic-nav-dropdown">
              {user?._id ? (
                <NavDropdown.Item onClick={() => dispatch(logoutUserAction())}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
              )}

              <NavDropdown.Divider />

              <NavDropdown.Item as={Link} to={"/admin/profile"}>
                Profile
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
