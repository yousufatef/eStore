import { Container } from "react-bootstrap";
import "./App";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Container>
        <main className="py-3">
          <h1>Welocome</h1>
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
