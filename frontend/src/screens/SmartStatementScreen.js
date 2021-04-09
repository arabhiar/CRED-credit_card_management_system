import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { getSmartStatementsByMonth } from '../actions/statementActions';
import { getCardById } from '../actions/cardActions';
import Loader from '../components/Loader';
import { Row, Col } from 'react-bootstrap';
import { SMART_STATEMENT_BY_MONTH_RESET } from '../constants/statementConstants';
import AlertMessage from '../components/AlertMessage';

const getRandomColor = (count) => {
  const transBackground = '0.2';
  const transBorder = '1';
  let colorArr = { background: [], border: [] };
  for (let i = 0; i < count; i++) {
    let color = 'rgba(';
    for (let j = 0; j < 3; j++) {
      color += Math.floor(Math.random() * 255) + ',';
    }
    let color1 = color + transBackground + ')';
    let color2 = color + transBorder + ')';
    colorArr.background.push(color1);
    colorArr.border.push(color2);
  }
  return colorArr;
};

const SmartStatementScreen = (props) => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const cardId = match.params.id;
  const year = match.params.year;
  const month = match.params.month;

  const [categoryPie, setCategoryPie] = useState(true);
  const [vendorPie, setVendorPie] = useState(true);
  const [categoryCountPie, setCategoryCountPie] = useState(true);
  const [vendorCountPie, setVendorCountPie] = useState(true);
  const [show, setShow] = useState(false);

  const colorCategory = useRef();
  const colorVendor = useRef();
  const colorCategoryCount = useRef();
  const colorVendorCount = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cardDetails = useSelector((state) => state.cardDetails);
  const { card } = cardDetails;

  const smartStatementsByMonth = useSelector(
    (state) => state.smartStatementsByMonth
  );
  const { stat, error, loading } = smartStatementsByMonth;
  console.log(stat);
  if (stat && !colorCategory.current) {
    colorCategory.current = getRandomColor(stat.categories.labels.length);
    colorVendor.current = getRandomColor(stat.vendors.labels.length);
    colorCategoryCount.current = getRandomColor(
      stat.categoriesCount.labels.length
    );
    colorVendorCount.current = getRandomColor(stat.vendorsCount.labels.length);
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!card.cardNumber) {
        dispatch(getCardById(cardId));
      } else {
        dispatch(getSmartStatementsByMonth(card.cardNumber, year, month));
        setShow(true);
      }
    }
    return () => {
      dispatch({ type: SMART_STATEMENT_BY_MONTH_RESET });
    };
  }, [userInfo, history, card, dispatch, year, month, cardId]);

  const onCloseHandler = () => {
    setShow(false);
  };

  return (
    <>
      <h2
        className="text-center"
        style={{ marginTop: '2.5rem', marginBottom: '1rem' }}
      >
        Smart Statements
      </h2>
      {show && error && (
        <AlertMessage variant="danger" onCloseHandler={onCloseHandler}>
          {error}
        </AlertMessage>
      )}
      {loading || !stat ? (
        <Loader color={'#333940'} />
      ) : (
        <>
          <div>
            <Row>
              <Col md={6}>
                <div className="text-center">
                  <p
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      marginTop: '1.5rem',
                    }}
                  >
                    Spending on basis of category.
                  </p>
                  {stat.categories.labels && stat.categories.labels.length > 0 && (
                    <OverlayTrigger
                      placement="left"
                      overlay={
                        <Tooltip id={`tooltip-left`}>
                          {categoryPie ? 'Bar Chart' : 'Pie Chart'}
                        </Tooltip>
                      }
                    >
                      <Button
                        style={{ marginBottom: '1rem' }}
                        onClick={() => setCategoryPie(!categoryPie)}
                        size="sm"
                        variant="outline-info"
                      >
                        <i
                          className={
                            categoryPie
                              ? 'far fa-chart-bar fa-lg'
                              : 'fas fa-chart-pie fa-lg'
                          }
                        ></i>
                      </Button>
                    </OverlayTrigger>
                  )}

                  {categoryPie ? (
                    <PieChart
                      color={colorCategory.current}
                      labels={stat.categories.labels}
                      label="Pie Chart"
                      value={stat.categories.data}
                    />
                  ) : (
                    <BarChart
                      color={colorCategory.current}
                      labels={stat.categories.labels}
                      label="Bar Chart"
                      value={stat.categories.data}
                    />
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="text-center">
                  <p
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      marginTop: '1.5rem',
                    }}
                  >
                    Spending on basis of vendor.
                  </p>
                  {stat.vendors.labels && stat.vendors.labels.length > 0 && (
                    <OverlayTrigger
                      placement="left"
                      overlay={
                        <Tooltip id={`tooltip-left`}>
                          {vendorPie ? 'Bar Chart' : 'Pie Chart'}
                        </Tooltip>
                      }
                    >
                      <Button
                        style={{ marginBottom: '1rem' }}
                        onClick={() => setVendorPie(!vendorPie)}
                        size="sm"
                        variant="outline-info"
                      >
                        <i
                          className={
                            vendorPie
                              ? 'far fa-chart-bar fa-lg'
                              : 'fas fa-chart-pie fa-lg'
                          }
                        ></i>
                      </Button>
                    </OverlayTrigger>
                  )}

                  {vendorPie ? (
                    <PieChart
                      color={colorVendor.current}
                      labels={stat.vendors.labels}
                      label="Pie Chart"
                      value={stat.vendors.data}
                    />
                  ) : (
                    <BarChart
                      color={colorVendor.current}
                      labels={stat.vendors.labels}
                      label="Bar Chart"
                      value={stat.vendors.data}
                    />
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="text-center">
                  <p
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      marginTop: '1.5rem',
                    }}
                  >
                    Count for each category.
                  </p>
                  {stat.categoriesCount.labels &&
                    stat.categoriesCount.labels.length > 0 && (
                      <OverlayTrigger
                        placement="left"
                        overlay={
                          <Tooltip id={`tooltip-left`}>
                            {categoryCountPie ? 'Bar Chart' : 'Pie Chart'}
                          </Tooltip>
                        }
                      >
                        <Button
                          style={{ marginBottom: '1rem' }}
                          onClick={() => setCategoryCountPie(!categoryCountPie)}
                          size="sm"
                          variant="outline-info"
                        >
                          <i
                            className={
                              categoryCountPie
                                ? 'far fa-chart-bar fa-lg'
                                : 'fas fa-chart-pie fa-lg'
                            }
                          ></i>
                        </Button>
                      </OverlayTrigger>
                    )}

                  {categoryCountPie ? (
                    <PieChart
                      color={colorCategoryCount.current}
                      labels={stat.categoriesCount.labels}
                      label="Pie Chart"
                      value={stat.categoriesCount.data}
                    />
                  ) : (
                    <BarChart
                      color={colorCategoryCount.current}
                      labels={stat.categoriesCount.labels}
                      label="Bar Chart"
                      value={stat.categoriesCount.data}
                    />
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="text-center">
                  <p
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      marginTop: '1.5rem',
                    }}
                  >
                    Count for each vendor.
                  </p>
                  {stat.vendorsCount.labels &&
                    stat.vendorsCount.labels.length > 0 && (
                      <OverlayTrigger
                        placement="left"
                        overlay={
                          <Tooltip id={`tooltip-left`}>
                            {vendorCountPie ? 'Bar Chart' : 'Pie Chart'}
                          </Tooltip>
                        }
                      >
                        <Button
                          style={{ marginBottom: '1rem' }}
                          onClick={() => setVendorCountPie(!vendorCountPie)}
                          size="sm"
                          variant="outline-info"
                        >
                          <i
                            className={
                              vendorCountPie
                                ? 'far fa-chart-bar fa-lg'
                                : 'fas fa-chart-pie fa-lg'
                            }
                          ></i>
                        </Button>
                      </OverlayTrigger>
                    )}

                  {vendorCountPie ? (
                    <PieChart
                      color={colorVendorCount.current}
                      labels={stat.vendorsCount.labels}
                      label="Pie Chart"
                      value={stat.vendorsCount.data}
                    />
                  ) : (
                    <BarChart
                      color={colorVendorCount.current}
                      labels={stat.vendorsCount.labels}
                      label="Bar Chart"
                      value={stat.vendorsCount.data}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default SmartStatementScreen;
