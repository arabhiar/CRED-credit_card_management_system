import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreditCard2 from './components/CreditCard2';
import AddCardScreen from './screens/AddCardScreen';
import LoginScreen2 from './screens/LoginScreen2';
import RegisterScreen2 from './screens/RegisterScreen2';
import ProfileScreen2 from './screens/ProfileScreen2';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen2} />
          <Route path="/register" component={RegisterScreen2} />
          <Route path="/profile" component={ProfileScreen2} exact/>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/credit" component={CreditCard2} exact />
          <Route path="/add" component={AddCardScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
