import React from "react";
import HashLoader from "react-spinners/HashLoader";

const override = `
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const Loader = (props) => {
  const { color } = props;
  return <HashLoader color={color} css={override} size={150} />;
};

export default Loader;
