import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  NavLink,
} from 'react-bootstrap';
import SearchBox from '../SearchBox';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { getRewardPoints } from '../../actions/rewardActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const rewardPoints = useSelector((state) => state.rewardPoints);
  const { coins } = rewardPoints;

  // const [coins, setCoins] = useState(135);
  useEffect(() => {
    if (userInfo) {
      dispatch(getRewardPoints());
    }
  }, [userInfo, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="navbar-fixed-bottom navbar-inner"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                style={{ width: '40%', height: 'auto' }}
                src="/images/cred-logo.png"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              {userInfo ? (
                <>
                  {coins && (
                    <LinkContainer
                      style={{ paddingRight: '2rem' }}
                      to="/rewards"
                    >
                      <NavLink>
                        <i className="fas fa-coins fa-lg"></i> {coins}
                      </NavLink>
                    </LinkContainer>
                  )}

                  <NavDropdown title={userInfo.email} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-menu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
