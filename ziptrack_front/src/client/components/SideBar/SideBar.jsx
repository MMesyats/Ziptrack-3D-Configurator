import React, { useState } from "react";
import Form from "../Form/Form";
import moveIcon from "../../assets/illustrations/move-icon.svg";
import rotateIcon from "../../assets/illustrations/rotate-icon.svg";
import settingsIcon from "../../assets/illustrations/settings-icon.svg";
import "./SideBar.scss";

const SideBar = ({ changeControls }) => {
  const [isOpen, changeOpen] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    changeOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-icons-group">
        <button
          onClick={() => {
            changeControls("orbit");
          }}
          dangerouslySetInnerHTML={{ __html: rotateIcon }}
        />
        <button
          onClick={() => {
            changeControls("drag");
          }}
          dangerouslySetInnerHTML={{ __html: moveIcon }}
        />
        <button
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: settingsIcon }}
        />
      </div>
      <Form />
    </div>
  );
};

export default SideBar;
