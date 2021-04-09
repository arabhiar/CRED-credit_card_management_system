import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <div
      className="pb-0 mb-0 justify-content-center text-light"
      style={{ backgroundColor: '#333940' }}
    >
      <footer>
        <Container>
          <div className="row my-5 py-5">
            <div className="col-12">
              <div className="row ">
                <div className="col-xl-6 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                  <h3
                    className="text-muted mb-md-0 mb-5 bold-text"
                    style={{ fontSize: '2rem' }}
                  >
                    CRED
                  </h3>
                </div>
                <div className="col-xl-3 col-md-4 col-sm-4 col-12">
                  <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5">
                    <b>Menu</b>
                  </h6>
                  <ul className="list-unstyled">
                    <li>Home</li>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Portfolio</li>
                  </ul>
                </div>
                <div className="col-xl-3 col-md-4 col-sm-4 col-12">
                  <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5">
                    <b>Address</b>
                  </h6>
                  <p className="mb-1">BIT Mesra, Ranchi</p>
                  <p>Jharkhand</p>
                </div>
              </div>
              <div className="row ">
                <div className="col-xl-6 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                  <p className="social text-muted mb-0 pb-0 bold-text">
                    {' '}
                    <span className="mx-2">
                      <i className="fab fa-facebook" aria-hidden="true"></i>
                    </span>{' '}
                    <span className="mx-2">
                      <i className="fab fa-linkedin" aria-hidden="true"></i>
                    </span>{' '}
                    <span className="mx-2">
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </span>{' '}
                    <span className="mx-2">
                      <i className="fab fa-instagram" aria-hidden="true"></i>
                    </span>{' '}
                  </p>
                  <small className="rights">
                    <span>&#174;</span> CRED All Rights Reserved.
                  </small>
                </div>

                <div className="col-xl-3 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                  <h6 className="mt-55 mt-2 text-muted bold-text">
                    <a
                      href="https://github.com/arabhiar"
                      target="_blank"
                      rel="noreferrer"
                      className="hover-none"
                    >
                      <b>Abhishek Ranjan</b>
                    </a>
                  </h6>
                  <small>
                    {' '}
                    <span>
                      <i className="fas fa-envelope" aria-hidden="true"></i>
                    </span>{' '}
                    abhishekrotary2002@gmail.com
                  </small>
                </div>
                <div className="col-xl-3 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 ">
                  <h6 className="text-muted bold-text">
                    <a
                      href="https://github.com/ishuu7"
                      target="_blank"
                      rel="noreferrer"
                      className="hover-none"
                    >
                      <b>Narendra Manglani</b>
                    </a>
                  </h6>
                  <small>
                    <span>
                      <i className="fas fa-envelope" aria-hidden="true"></i>
                    </span>{' '}
                    narendramanglani04@gmail.com
                  </small>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
