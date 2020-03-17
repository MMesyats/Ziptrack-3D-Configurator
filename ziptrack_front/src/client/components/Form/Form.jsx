import React, { useState, useContext, useEffect } from "react";
import { API_ENDPOINT } from "../../../GLOBALS";
import AppContext from "../../AppContext";
import HeightAndWidth from "../HeightAndWidth/HeightAndWidth";
import PelmetRadio from "../PelmetRadio/PelmetRadio";
import MaterialRadio from "../MaterialRadio/MaterialRadio";
import MechanicRadio from "../MechanicRadio/MechanicRadio";
import MountingRadio from "../MountingRadio/MountingRadio";
import ProductTypeRadio from "../ProductTypeRadio/ProductTypeRadio";
import ColorsRadio from "../ColorsRadio/ColorsRadio";
import TextArea from "../TextArea/TextArea";
import QuantityInput from "../QuantityInput/QuantityInput";
import BWSRadio from "../BWSRadio/BWSRadio";
import Modal from "../Modal/Modal";
import "./Form.scss";

const Form = () => {
  const {
    location: { search }
  } = window;

  const data =
    search !== ""
      ? (() => {
          const uriParams = new URLSearchParams(decodeURIComponent(search));
          return JSON.parse(uriParams.get("data"));
        })()
      : {};
  const {
    height,
    width,
    changeWidth,
    changeHeight,
    frameColor,
    changeFrameColor
  } = useContext(AppContext);
  const [showModal, changeModalState] = useState(false);
  const [productType, changeProductType] = useState(data.product_type || "1");
  const [pelmet, changePelmet] = useState(data.pelmet || "1");
  const [material, changeMaterial] = useState(data.material || "1");
  const [mechanic, changeMechanic] = useState(data.mechanic || "1");
  const [mounting, changeMounting] = useState(data.mounting || "1");
  const [mechanicOption, changeMechaicOption] = useState(
    data.mechanic_option || "1"
  );
  const [bws, changeBWS] = useState(data.bottom_weather_strip || "1");
  const [splineColor, changeSplineColor] = useState(
    data.spline_color ? `#${data.spline_color}` : "#000000"
  );
  const [quantity, changeQuantity] = useState(+data.quantity || 1);
  const [notes, changeNotes] = useState(data.notes || "");
  const [sended, changeSended] = useState(false);
  const [error, setError] = useState(false);

  const handleUnload = e => {
    if (!sended) {
      e.returnValue = false;
    } else {
      window.removeEventListener("beforeunload", handleUnload);
    }
  };
  useEffect(() => {
    sended
      ? window.removeEventListener("beforeunload", handleUnload)
      : window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [sended]);

  const handleSubmit = e => {
    e.preventDefault();
    const dataToSend = {
      product_type: productType,
      width: width,
      height: height,
      pelmet: pelmet,
      frame_color: frameColor,
      spline_color: splineColor,
      bws: bws,
      material: material,
      mechanic: mechanic,
      mechanic_option: mechanicOption,
      mounting: mounting,
      quantity: quantity,
      notes: notes
    };
    data.id
      ? fetch(`${API_ENDPOINT}/product/update`, {
          method: "PUT",
          mode: "cors",
          header: {
            "Content-Type": "application/json"
          },
          body: (() => {
            dataToSend.id = data.id;
            return JSON.stringify(dataToSend);
          })()
        })
          .then(response => {
            console.log(response);
            changeSended(true);
          })
          .catch(err => setError(err))
          .finally(() => changeModalState(true))
      : fetch(`${API_ENDPOINT}/product/add/`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend)
        })
          .then(response => {
            console.log(response);
            changeSended(true);
          })
          .catch(err => setError(err))
          .finally(() => changeModalState(true));
  };

  return (
    <>
      <form className="form" action="">
        <div className="form-fields">
          {data.id && <h4 className="id">{`ID: ${data.id}`}</h4>}
          <HeightAndWidth
            height={data.height ? data.height : height}
            width={data.width ? data.width : width}
          />
          <ProductTypeRadio
            defaultValue={productType}
            onChange={changeProductType}
          />
          <PelmetRadio defaultValue={pelmet} onChange={changePelmet} />
          <MaterialRadio defaultValue={material} onChange={changeMaterial} />
          <MechanicRadio
            defaultMechanic={mechanic}
            changeMechanicProp={changeMechanic}
            defaultOption={mechanicOption}
            changeOptionProp={changeMechaicOption}
          />
          <BWSRadio defaultValue={bws} onChange={changeBWS} />
          <ColorsRadio
            name="frame-color"
            label="Frame Color"
            defaultValue={data.frame_color ? `#${data.frame_color}` : "#000000"}
            onChange={hex => changeFrameColor(hex)}
          />
          <ColorsRadio
            name="spline-color"
            label="Spline Color"
            defaultValue={splineColor}
            onChange={changeSplineColor}
          />
          <MountingRadio defaultValue={mounting} onChange={changeMounting} />
          <QuantityInput defaultValue={quantity} onChange={changeQuantity} />
          <TextArea defaultValue={notes} onChange={changeNotes} />
        </div>

        <input
          className="form-send"
          type="submit"
          onClick={handleSubmit}
          value={data.id ? "Update" : "Send"}
        />
      </form>
      {showModal && <Modal changeModalState={changeModalState} error={error} />}
    </>
  );
};

export default Form;
