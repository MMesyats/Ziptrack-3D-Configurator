import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RadioGroup from "../RadioGroup/RadioGroup";
import ColorRadio from "./ColorRadio";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const COLOR_QUERY = gql`
  query {
    colors: allColors {
      id
      name
      hex
    }
  }
`;

const ColorsRadio = ({ label, name, defaultValue, onChange }) => {
  const [currentValue, changeValue] = useState(defaultValue);
  const { data = {}, loading, error } = useQuery(COLOR_QUERY);
  const { colors = [] } = data;

  useEffect(() => {
    console.log(currentValue);
    onChange(currentValue);
  }, [currentValue]);

  if (loading) return <div />;
  if (error) return <h6> Error </h6>;

  return (
    <RadioGroup label={label} name={name} defaultValue={currentValue}>
      {colors.map(({ id, hex }) => (
        <ColorRadio
          key={name + "_" + id}
          hexValue={hex}
          value={hex}
          callback={value => changeValue(value)}
        />
      ))}
    </RadioGroup>
  );
};

export default ColorsRadio;

ColorsRadio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func
};
