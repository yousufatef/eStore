import { Container } from "react-bootstrap";
import "./App";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Header />
      <Container>
        <main className="py-3">
          <HomePage />
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
