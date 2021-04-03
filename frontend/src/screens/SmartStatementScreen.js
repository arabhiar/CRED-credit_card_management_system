import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

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

const SmartStatementScreen = () => {
  const [categoryPie, setCategoryPie] = useState(true);
  const [vendorPie, setVendorPie] = useState(true);

  const color = useRef(getRandomColor(6));

  return (
    <>
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip id={`tooltip-left`}>
            {categoryPie ? 'Bar Chart' : 'Pie Chart'}
          </Tooltip>
        }
      >
        <Button
          onClick={() => setCategoryPie(!categoryPie)}
          size="sm"
          variant="outline-info"
        >
          <i
            class={
              categoryPie ? 'far fa-chart-bar fa-lg' : 'fas fa-chart-pie fa-lg'
            }
          ></i>
        </Button>
      </OverlayTrigger>

      {categoryPie ? (
        <PieChart color={color.current} />
      ) : (
        <BarChart color={color.current} />
      )}
    </>
  );
};

export default SmartStatementScreen;
