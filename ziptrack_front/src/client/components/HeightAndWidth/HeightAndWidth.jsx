import React, { useContext } from "react";
import RangeInput from "../RangeInput/RangeInput";
import AppContext from "../../AppContext";

const HeightAndWidth = ({ height, width }) => {
  const { changeHeight, changeWidth } = useContext(AppContext);
  return (
    <>
      <RangeInput
        label="Height"
        min={0.1}
        max={7}
        step={0.1}
        defaultValue={+height}
        onChange={changeHeight}
      />
      <RangeInput
        label="Width"
        min={0.1}
        max={7}
        step={0.1}
        defaultValue={+width}
        onChange={changeWidth}
      />
    </>
  );
};

export default HeightAndWidth;
