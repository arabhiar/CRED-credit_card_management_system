import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import AddCardScreen from './screens/AddCardScreen';
import LoginScreen2 from './screens/LoginScreen2';
import RegisterScreen2 from './screens/RegisterScreen2';
import ProfileScreen2 from './screens/ProfileScreen2';
import CardScreen from './screens/CardScreen';
import StatementScreen from './screens/StatementScreen';
import SmartStatementScreen from './screens/SmartStatementScreen';
import RadarChart from './components/RadarChart';
import Coupon from './components/Coupon';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen2} />
          <Route path="/register" component={RegisterScreen2} />
          <Route path="/profile" component={ProfileScreen2} exact />
          <Route path="/cards/add/new" component={AddCardScreen} exact />
          <Route
            path="/cards/:id/statements/:year/:month"
            component={StatementScreen}
            exact
          />
          <Route
            path="/cards/:id/smartstatements/:year/:month"
            component={SmartStatementScreen}
            exact
          />
          <Route
            path="/cards/:id/statements/:year/:month/:pageNumber"
            component={StatementScreen}
          />
          <Route path="/cards/:id" component={CardScreen} exact />
          <Route path="/coupon" component={Coupon} />
          <Route path="/credit" component={CardScreen} exact />
          <Route path="/radar" component={RadarChart} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
