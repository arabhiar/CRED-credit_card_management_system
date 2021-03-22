import React from 'react';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #333940;
`;

const Loader = (props) => {
  const { color } = props;
  return <PuffLoader color={color} css={override} size={120} />;
};

export default Loader;
