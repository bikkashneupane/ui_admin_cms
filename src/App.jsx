import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FaHome } from "react-icons/fa";

function App() {
  return (
    <>
      <FaHome />
      <ToastContainer />
    </>
  );
}

export default App;
