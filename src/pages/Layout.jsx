import { Container } from "react-bootstrap";
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
    </div>
  );
};

export default Layout;
