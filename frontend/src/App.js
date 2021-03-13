import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login/" component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
