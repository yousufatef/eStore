import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Container>
        <main className="py-3">
          <Outlet />
        </main>
      </Container>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
